<script lang="ts">
	// Svelte
	import { onMount } from "svelte";

	// Models
	import { UniformBuffer } from "$lib/models/UniformBuffer";

	// Shaders
	import shader from "$lib/shaders/loading.wgsl";

	// Types
	type Uniforms = {
		time: number;
		aspectRatio: number;
		paddingEnd: [number, number];
	};

	// Variables
	let rootElement: HTMLElement;
	let startTime: number;

	onMount(async () => {
		startTime = performance.now();

		const canvas = document.createElement("canvas");
		rootElement.appendChild(canvas);
		canvas.style.width = "100%";
		canvas.style.height = "100%";
		const aspectRatio = canvas.clientWidth / canvas.clientHeight;

		const { device, context, presentationFormat } = await initWebGPU(canvas);

		const module = device.createShaderModule({
			code: shader,
		});

		const uniformsData: Uniforms = {
			time: 0,
			aspectRatio: aspectRatio,
			paddingEnd: [0, 0],
		};

		const bufferData = new Float32Array([uniformsData.time, uniformsData.aspectRatio, ...uniformsData.paddingEnd]);

		const uniformBuffer = new UniformBuffer(device, bufferData, {
			type: "uniform",
			hasDynamicOffset: false,
			minBindingSize: bufferData.byteLength,
		});

		const pipeline = createPipeline(device, presentationFormat, module, [uniformBuffer.layout]);

		const render = () => {
			const elapsedTime = (performance.now() - startTime) / 1000;
			const renderPassDescriptor = {
				colorAttachments: [
					{
						view: context.getCurrentTexture().createView(),
						clearValue: [1.0, 1.0, 1.0, 1.0],
						loadOp: "clear",
						storeOp: "store",
					},
				],
			} as GPURenderPassDescriptor;

			const commandEncoder = device.createCommandEncoder();
			const pass = commandEncoder.beginRenderPass(renderPassDescriptor);
			pass.setPipeline(pipeline);
			pass.setBindGroup(0, uniformBuffer.bindGroup);
			pass.draw(6);
			pass.end();
			device.queue.submit([commandEncoder.finish()]);

			uniformBuffer.update(new Float32Array([elapsedTime, aspectRatio, 0, 0]));

			requestAnimationFrame(render);
		};

		render();
	});

	async function initWebGPU(canvas: HTMLCanvasElement) {
		const adapter = await navigator.gpu?.requestAdapter();
		const device = await adapter?.requestDevice();
		if (!device) {
			throw new Error("WebGPU is not supported on this device");
		}
		const context = canvas.getContext("webgpu");
		if (!context) {
			throw new Error("WebGPU not supported");
		}
		const devicePixelRatio = window.devicePixelRatio || 1;
		const presentationSize = [canvas.clientWidth * devicePixelRatio, canvas.clientHeight * devicePixelRatio];
		canvas.width = presentationSize[0];
		canvas.height = presentationSize[1];
		const presentationFormat = navigator.gpu.getPreferredCanvasFormat();
		context.configure({
			device,
			format: presentationFormat,
			alphaMode: 'premultiplied',
		});

		return { device, context, presentationFormat };
	}

	function createPipeline(
		device: GPUDevice,
		presentationFormat: GPUTextureFormat,
		module: GPUShaderModule,
		bindGroupLayouts: GPUBindGroupLayout[]
	) {
		const pipelineLayout = device.createPipelineLayout({
			bindGroupLayouts,
		});
		const pipeline = device.createRenderPipeline({
			layout: pipelineLayout,
			vertex: {
				module,
				entryPoint: "vertex_shader",
			},
			fragment: {
				module,
				entryPoint: "fragment_shader",
				targets: [{ format: presentationFormat }],
			},
		});
		return pipeline;
	}
</script>

<!-- Main container -->
<div bind:this={rootElement} class="w-[800px] h-[400px] flex mt-32"></div>
