/// <reference types="@sveltejs/kit" />
import { Buffer } from 'buffer';
import process from 'process';


globalThis.Buffer = Buffer;
globalThis.process = process;
