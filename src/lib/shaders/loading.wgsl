// Inspired by: https://www.shadertoy.com/view/fsGGWG

struct VSOut {
    @builtin(position) position: vec4f,
    @location(0) uv: vec2f,
};

@vertex fn vertex_shader(@builtin(vertex_index) vertexIndex: u32) -> VSOut {
    var vsOut: VSOut;
    let pos = array(
        vec2f(-1.0, -1.0),
        vec2f( 1.0, -1.0),
        vec2f(-1.0,  1.0),
        vec2f(-1.0,  1.0),
        vec2f( 1.0, -1.0),
        vec2f( 1.0,  1.0)
    );
    let uv = array(
        vec2f(0.0, 0.0),
        vec2f(1.0, 0.0),
        vec2f(0.0, 1.0),
        vec2f(0.0, 1.0),
        vec2f(1.0, 0.0),
        vec2f(1.0, 1.0)
    );
    vsOut.uv = uv[vertexIndex];
    vsOut.position = vec4f(pos[vertexIndex], 0.0, 1.0);

    return vsOut;
}

struct Uniforms {
    time: f32,
    aspect_ratio: f32,
    padding_end: f32,
};

const SCALE: f32 = 0.15;
const SPEED: f32 = 0.1;
const INTENSITY: f32 = 20.0;
const LENGTH: f32 = 0.5;
const RADIUS: f32 = 0.5;
const FADING: f32 = 0.125;
const GLOW: f32 = 15.0;
const M_2_PI = 6.28318530;

@binding(0) @group(0) var<uniform> uniforms: Uniforms;

@fragment fn fragment_shader(v: VSOut) -> @location(0) vec4f {

    let distance_to_scene: f32 = 10.0;
    let plane_size: vec2f = vec2f(distance_to_scene, distance_to_scene / uniforms.aspect_ratio);
    let uv: vec2f = (v.uv - 0.5) * vec2f(plane_size.x / 2, plane_size.y / 2);

    let dist1: f32 = map_circle(uv.yx * vec2f(1.0, 0.66), 1.0, uniforms.time);
	let dist2: f32 = map_infinite(uv.xy * vec2f(0.66, 1.0), 2.0, uniforms.time);
	let dist3: f32 = map_circle(uv.xy * vec2f(1.0, 0.88), 4.0, uniforms.time);
    
    let col1: vec3f = vec3f(0.596, 0.369, 0.529) * pow(RADIUS/dist1, GLOW);
	let col2: vec3f = vec3f(0.663, 0.710, 0.255) * pow(RADIUS/dist2, GLOW);
	let col3: vec3f = vec3f(0.627, 0.529, 0.400) * pow(RADIUS/dist3, GLOW);

    var col: vec3f = (col1 + col2 + col3) * (2.0 * GLOW);

    let intensity: f32 = length(col);
    let alpha: f32 = clamp(intensity, 0.0, 1.0);

    let fade_alpha: f32 = clamp(uniforms.time / 1.5, 0.0, 1.0);
    
    let final_alpha: f32 = alpha * fade_alpha;
    
    let frag_color = vec4f(col, final_alpha);
    return frag_color;
}

fn sd_bezier(pos: vec2f, A: vec2f, B: vec2f, C: vec2f) -> vec2f {
    let a: vec2f = B - A;
    let b: vec2f = A - 2.0*B + C;
    let c: vec2f = a * 2.0;
    let d: vec2f = A - pos;

    let kk: f32 = 1.0 / dot(b,b);
    let kx: f32 = kk * dot(a,b);
    let ky: f32 = kk * (2.0*dot(a,a)+dot(d,b)) / 3.0;
    let kz: f32 = kk * dot(d,a);      

    let p: f32 = ky - kx*kx;
    let p3: f32 = p*p*p;
    let q: f32 = kx*(2.0*kx*kx - 3.0*ky) + kz;
    var h: f32 = q*q + 4.0*p3;

    h = sqrt(h);
    let x: vec2f = (vec2(h, -h) - q) / 2.0;
    let uv: vec2f = sign(x)*pow(abs(x), vec2f(1.0/3.0));
    let t: f32 = clamp(uv.x+uv.y-kx, 0.0, 1.0);

    return vec2f(length(d+(c+b*t)*t),t);
}

fn circle(t: f32) -> vec2f {
    let x: f32 = SCALE * sin(t);
    let y: f32 = SCALE * cos(t);
    return vec2f(x, y);
}

fn leminiscate(t: f32) -> vec2f {
    let x: f32 = (SCALE * (cos(t) / (1.0 + sin(t) * sin(t))));
    let y: f32 = (SCALE * (sin(t) * cos(t) / (1.0 + sin(t) * sin(t))));
    return vec2f(x, y);
}

fn map_infinite(pos: vec2f, sp: f32, t: f32) -> f32 {
    let time = fract(-SPEED * t * sp);
    let dl: f32 = LENGTH / INTENSITY;
    var p1: vec2f = leminiscate(time * M_2_PI);
    var p2: vec2f = leminiscate((dl + time) * M_2_PI);
    var c: vec2f = (p1 + p2) / 2.0;
    var d: f32 = 1e9;
    
    for (var i: i32 = 2; i < i32(INTENSITY); i++) {
        p1 = p2;
        p2 = leminiscate((f32(i) * dl + time) * M_2_PI);
        let c_prev: vec2f = c;
        c = (p1 + p2) / 2.0;
        let f: vec2f = sd_bezier(pos, c_prev, p1, c);
        d = min(d, f.x + FADING * (f.y + f32(i)) / INTENSITY);
    }
    return d;
}

fn map_circle(pos: vec2f, sp: f32, t: f32) -> f32 {
    let time = fract(-SPEED * t * sp);
    let dl: f32 = LENGTH / INTENSITY;
    var p1: vec2f = circle(time * M_2_PI);
    var p2: vec2f = circle((dl + time) * M_2_PI);
    var c: vec2f = (p1 + p2) / 2.0;
    var d: f32 = 1e9;
    
    for (var i: i32 = 2; i < i32(INTENSITY); i++) {
        p1 = p2;
        p2 = circle((f32(i) * dl + time) * M_2_PI);
        let c_prev: vec2f = c;
        c = (p1 + p2) / 2.0;
        let f: vec2f = sd_bezier(pos, c_prev, p1, c);
        d = min(d, f.x + FADING * (f.y + f32(i)) / INTENSITY);
    }
    return d;
}