/* eslint-disable prettier/prettier */
import { defineConfig, UserConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { visualizer } from 'rollup-plugin-visualizer'
// https://vitejs.dev/config/
export default defineConfig(({ mode }): UserConfig => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    plugins: [react(), visualizer()],
    base: env.NODE_ENV === 'development' ? './' : '/',
    server: {
      port: Number(env.VITE_APP_PORT),
      open: false,
      proxy: {
        [env.VITE_BASE_URL]: {
          target: 'http://192.168.110.35:10017',
          changeOrigin: true,
        },
        // [env.VITE_BASE_URL]: {
        //   target: 'https://fs.xiaohengquan.com',
        //   changeOrigin: true,
        //   secure: true, // 添加这个选项处理HTTPS
        // },
      }
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src')
      }
    },
    build: {
      minify: 'esbuild',
      // 构建后是否生成 source map 文件(用于线上报错代码报错映射对应代码)
      sourcemap: false,
      // 指定输出路径（相对于 项目根目录)
      outDir: 'dist',
      // 启用/禁用 gzip 压缩大小报告 - 压缩大型输出文件可能会很慢，因此禁用该功能可能会提高大型项目的构建性能
      reportCompressedSize: false,
      // chunk 大小警告的限制（以 kbs 为单位）
      chunkSizeWarningLimit: 2000,
      rollupOptions: {
        output: {
          chunkFileNames: 'assets/js/[name]-[hash].js',
          entryFileNames: 'assets/js/[name]-[hash].js',
          assetFileNames: 'assets/[ext]/[name]-[hash].[ext]'
        }
      }
    }
  }
})
