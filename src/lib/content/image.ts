/**
 * An imported image asset.
 *
 * Vite resolves `import img from './x.png'` to a URL string, unlike Next,
 * which returned a `StaticImageData` object. Keeping this alias means call
 * sites say what they mean and the underlying representation can change
 * without another sweep through the codebase.
 */
export type ImageAsset = string;
