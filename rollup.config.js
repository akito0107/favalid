import typescript from 'rollup-plugin-typescript';

export default {
    entry: './src/main.ts',
    plugins: [
        typescript()
    ],
    output: {
        format: 'cjs',
        file: './dist/bundle.js',
    }
}
