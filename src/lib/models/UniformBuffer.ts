export class UniformBuffer {
	device: GPUDevice;
	buffer: GPUBuffer;
	layout: GPUBindGroupLayout;
	bindGroup: GPUBindGroup;

	constructor(device: GPUDevice, data: Float32Array, entry: GPUBufferBindingLayout) {
		this.device = device;
		this.buffer = device.createBuffer({
			size: data.byteLength,
			usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
			mappedAtCreation: true,
		});

		new Float32Array(this.buffer.getMappedRange()).set(data);
		this.buffer.unmap();

		this.layout = device.createBindGroupLayout({
			entries: [{ binding: 0, visibility: GPUShaderStage.FRAGMENT | GPUShaderStage.VERTEX, buffer: entry }],
		});

		this.bindGroup = device.createBindGroup({
			layout: this.layout,
			entries: [
				{
					binding: 0,
					resource: {
						buffer: this.buffer,
					},
				},
			],
		});
	}

	update(data: Float32Array) {
		this.device.queue.writeBuffer(this.buffer, 0, data);
	}
}
