/* tslint:disable */
/* eslint-disable */
/**
*/
export function start(): void;
/**
*/
export enum Task {
  Transcribe = 0,
  Translate = 1,
}
/**
*/
export enum RepoType {
/**
* This is a model, usually it consists of weight files and some configuration
*/
  Model = 0,
/**
* This is a dataset, usually contains data within parquet files
*/
  Dataset = 1,
/**
* This is a space, usually a demo showcashing a given model or dataset
*/
  Space = 2,
}
/**
*/
export enum Quantization {
  Q8_0 = 0,
  F32 = 1,
}
export type WhisperVariants = "tiny" | "base" | "small" | "medium" | "large_v2" | "large_v3" | "distil_large_v3";

export type PhiVariants = "phi2" | "phi3";

export type AvailableModels = { Whisper: WhisperVariants } | { Phi: PhiVariants } | "Moondream";

/**
*/
export class Api {
  free(): void;
/**
* @param {string} file_name
* @param {Function} callback
* @returns {Promise<Uint8Array>}
*/
  get_with_progress(file_name: string, callback: Function): Promise<Uint8Array>;
/**
* Get a file from the repository
* @param {string} file_name
* @returns {Promise<Uint8Array>}
*/
  get(file_name: string): Promise<Uint8Array>;
/**
* @param {string} file_name
* @returns {Promise<any>}
*/
  fetch_gguf_header(file_name: string): Promise<any>;
/**
* @param {string} file_name
* @param {bigint} start
* @param {bigint} end
* @returns {Promise<Uint8Array>}
*/
  fetch_range(file_name: string, start: bigint, end: bigint): Promise<Uint8Array>;
}
/**
*/
export class ApiBuilder {
  free(): void;
/**
* Build an Api from a HF hub repository.
* @param {string} repo_id
* @param {RepoType} ty
* @returns {ApiBuilder}
*/
  static from_hf(repo_id: string, ty: RepoType): ApiBuilder;
/**
* @param {string} repo_id
* @param {RepoType} ty
* @returns {string}
*/
  static endpoint(repo_id: string, ty: RepoType): string;
/**
* Build an Api from a HF hub repository at a specific revision.
* @param {string} repo_id
* @param {string} revision
* @returns {ApiBuilder}
*/
  static from_hf_with_revision(repo_id: string, revision: string): ApiBuilder;
/**
* Build an Api from a custom URL.
* @param {string} endpoint
* @returns {ApiBuilder}
*/
  static from_custom(endpoint: string): ApiBuilder;
/**
* Build the Api.
* @returns {Api}
*/
  build(): Api;
}
/**
*/
export class DecodingOptions {
  free(): void;
}
/**
*/
export class DecodingOptionsBuilder {
  free(): void;
/**
*/
  constructor();
/**
* @param {Task} task
* @returns {DecodingOptionsBuilder}
*/
  setTask(task: Task): DecodingOptionsBuilder;
/**
* @param {string} language
* @returns {DecodingOptionsBuilder}
*/
  setLanguage(language: string): DecodingOptionsBuilder;
/**
* @param {number} temperature
* @returns {DecodingOptionsBuilder}
*/
  setTemperature(temperature: number): DecodingOptionsBuilder;
/**
* @param {number} sample_len
* @returns {DecodingOptionsBuilder}
*/
  setSampleLen(sample_len: number): DecodingOptionsBuilder;
/**
* @param {number} best_of
* @returns {DecodingOptionsBuilder}
*/
  setBestOf(best_of: number): DecodingOptionsBuilder;
/**
* @param {number} beam_size
* @returns {DecodingOptionsBuilder}
*/
  setBeamSize(beam_size: number): DecodingOptionsBuilder;
/**
* @param {number} patience
* @returns {DecodingOptionsBuilder}
*/
  setPatience(patience: number): DecodingOptionsBuilder;
/**
* @param {number} length_penalty
* @returns {DecodingOptionsBuilder}
*/
  setLengthPenalty(length_penalty: number): DecodingOptionsBuilder;
/**
* @param {string} prompt
* @returns {DecodingOptionsBuilder}
*/
  setPrompt(prompt: string): DecodingOptionsBuilder;
/**
* @param {string} prefix
* @returns {DecodingOptionsBuilder}
*/
  setPrefix(prefix: string): DecodingOptionsBuilder;
/**
* @param {Int32Array} suppress_tokens
* @returns {DecodingOptionsBuilder}
*/
  setSuppressTokens(suppress_tokens: Int32Array): DecodingOptionsBuilder;
/**
* @param {boolean} suppress_blank
* @returns {DecodingOptionsBuilder}
*/
  setSuppressBlank(suppress_blank: boolean): DecodingOptionsBuilder;
/**
* @param {boolean} without_timestamps
* @returns {DecodingOptionsBuilder}
*/
  setWithoutTimestamps(without_timestamps: boolean): DecodingOptionsBuilder;
/**
* @param {number} max_initial_timestamp
* @returns {DecodingOptionsBuilder}
*/
  setMaxInitialTimestamp(max_initial_timestamp: number): DecodingOptionsBuilder;
/**
* @param {number} time_offset
* @returns {DecodingOptionsBuilder}
*/
  setTimeOffset(time_offset: number): DecodingOptionsBuilder;
/**
* @returns {any}
*/
  build(): any;
}
/**
*/
export class Model {
  free(): void;
/**
* The main JS entrypoint into the library.
*
* Loads a model with the provided ID.
* This key should be an enum of supported models.
* @param {AvailableModels} model
* @param {Quantization} quantization
* @param {Function} progress
* @returns {Promise<Model>}
*/
  static load(model: AvailableModels, quantization: Quantization, progress: Function): Promise<Model>;
/**
* User-facing method to run the model.
*
* Untyped input is required unfortunately.
* @param {any} input
* @returns {Promise<any>}
*/
  run(input: any): Promise<any>;
}
/**
*/
export class ModelKey {
  free(): void;
/**
* @param {string} repo_id
* @param {string} model_id
*/
  constructor(repo_id: string, model_id: string);
/**
*/
  readonly model_id: string;
/**
*/
  readonly repo_id: string;
}
/**
*/
export class Segment {
  free(): void;
/**
*/
  last: boolean;
/**
*/
  start: number;
/**
*/
  stop: number;
/**
*/
  text: string;
}

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
  readonly memory: WebAssembly.Memory;
  readonly __wbg_modelkey_free: (a: number) => void;
  readonly modelkey_new: (a: number, b: number, c: number, d: number) => number;
  readonly modelkey_repo_id: (a: number, b: number) => void;
  readonly modelkey_model_id: (a: number, b: number) => void;
  readonly __wbg_model_free: (a: number) => void;
  readonly model_load: (a: number, b: number, c: number) => number;
  readonly model_run: (a: number, b: number) => number;
  readonly __wbg_decodingoptions_free: (a: number) => void;
  readonly __wbg_decodingoptionsbuilder_free: (a: number) => void;
  readonly decodingoptionsbuilder_new: () => number;
  readonly decodingoptionsbuilder_setTask: (a: number, b: number) => number;
  readonly decodingoptionsbuilder_setLanguage: (a: number, b: number, c: number) => number;
  readonly decodingoptionsbuilder_setTemperature: (a: number, b: number) => number;
  readonly decodingoptionsbuilder_setSampleLen: (a: number, b: number) => number;
  readonly decodingoptionsbuilder_setBestOf: (a: number, b: number) => number;
  readonly decodingoptionsbuilder_setBeamSize: (a: number, b: number) => number;
  readonly decodingoptionsbuilder_setPatience: (a: number, b: number) => number;
  readonly decodingoptionsbuilder_setLengthPenalty: (a: number, b: number) => number;
  readonly decodingoptionsbuilder_setPrompt: (a: number, b: number, c: number) => number;
  readonly decodingoptionsbuilder_setPrefix: (a: number, b: number, c: number) => number;
  readonly decodingoptionsbuilder_setSuppressTokens: (a: number, b: number, c: number) => number;
  readonly decodingoptionsbuilder_setSuppressBlank: (a: number, b: number) => number;
  readonly decodingoptionsbuilder_setWithoutTimestamps: (a: number, b: number) => number;
  readonly decodingoptionsbuilder_setMaxInitialTimestamp: (a: number, b: number) => number;
  readonly decodingoptionsbuilder_setTimeOffset: (a: number, b: number) => number;
  readonly decodingoptionsbuilder_build: (a: number) => number;
  readonly __wbg_segment_free: (a: number) => void;
  readonly __wbg_get_segment_start: (a: number) => number;
  readonly __wbg_set_segment_start: (a: number, b: number) => void;
  readonly __wbg_get_segment_stop: (a: number) => number;
  readonly __wbg_set_segment_stop: (a: number, b: number) => void;
  readonly __wbg_get_segment_text: (a: number, b: number) => void;
  readonly __wbg_set_segment_text: (a: number, b: number, c: number) => void;
  readonly __wbg_get_segment_last: (a: number) => number;
  readonly __wbg_set_segment_last: (a: number, b: number) => void;
  readonly streamedsegment_start: (a: number) => number;
  readonly streamedsegment_stop: (a: number) => number;
  readonly streamedsegment_text: (a: number, b: number) => void;
  readonly streamedsegment_last: (a: number) => number;
  readonly start: () => void;
  readonly apibuilder_from_hf: (a: number, b: number, c: number) => number;
  readonly apibuilder_endpoint: (a: number, b: number, c: number, d: number) => void;
  readonly apibuilder_from_hf_with_revision: (a: number, b: number, c: number, d: number) => number;
  readonly apibuilder_from_custom: (a: number, b: number) => number;
  readonly apibuilder_build: (a: number) => number;
  readonly __wbg_api_free: (a: number) => void;
  readonly api_get_with_progress: (a: number, b: number, c: number, d: number) => number;
  readonly api_get: (a: number, b: number, c: number) => number;
  readonly api_fetch_gguf_header: (a: number, b: number, c: number) => number;
  readonly api_fetch_range: (a: number, b: number, c: number, d: number, e: number) => number;
  readonly __wbg_apibuilder_free: (a: number) => void;
  readonly __wbindgen_malloc: (a: number, b: number) => number;
  readonly __wbindgen_realloc: (a: number, b: number, c: number, d: number) => number;
  readonly __wbindgen_export_2: WebAssembly.Table;
  readonly __wbindgen_add_to_stack_pointer: (a: number) => number;
  readonly _dyn_core__ops__function__FnMut__A____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__hf2ab65e2bc950203: (a: number, b: number, c: number, d: number) => void;
  readonly _dyn_core__ops__function__FnMut__A____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__h0236cf867c1050f0: (a: number, b: number, c: number) => void;
  readonly _dyn_core__ops__function__FnMut__A____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__h579532716f9363bb: (a: number, b: number, c: number) => void;
  readonly _dyn_core__ops__function__Fn__A____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__hbe5f1c89510ca5d4: (a: number, b: number, c: number) => void;
  readonly _dyn_core__ops__function__Fn_____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__h6e93e98a9e859e28: (a: number, b: number) => void;
  readonly __wbindgen_free: (a: number, b: number, c: number) => void;
  readonly __wbindgen_exn_store: (a: number) => void;
  readonly wasm_bindgen__convert__closures__invoke2_mut__h5b75e9fc588da642: (a: number, b: number, c: number, d: number) => void;
  readonly __wbindgen_start: () => void;
}

export type SyncInitInput = BufferSource | WebAssembly.Module;
/**
* Instantiates the given `module`, which can either be bytes or
* a precompiled `WebAssembly.Module`.
*
* @param {SyncInitInput} module
*
* @returns {InitOutput}
*/
export function initSync(module: SyncInitInput): InitOutput;

/**
* If `module_or_path` is {RequestInfo} or {URL}, makes a request and
* for everything else, calls `WebAssembly.instantiate` directly.
*
* @param {InitInput | Promise<InitInput>} module_or_path
*
* @returns {Promise<InitOutput>}
*/
export default function __wbg_init (module_or_path?: InitInput | Promise<InitInput>): Promise<InitOutput>;
