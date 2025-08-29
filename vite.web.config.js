import { defineConfig } from "vite";
import path from "path";
import vitePluginImp from "vite-plugin-imp";
import { viteStaticCopy } from "vite-plugin-static-copy";
const resolve = (url) => path.resolve(__dirname, url);

console.log(
  "Jump file path===================================:",
  resolve("jump/index.html")
);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vitePluginImp({
      libList: [
        {
          libName: "three",
          libDirectory: "src",
          camel2DashComponentName: false,
        },
      ],
    }),
    viteStaticCopy({
      targets: [
        {
          src: "jump/**/*",
          dest: "jump",
          preserveTree: true, // 明确指定保持目录结构
        },
      ],
    }),
  ],
  css: {
    modules: {
      generateScopedName: "[name]__[local]__[hash:5]",
    },
    preprocessorOptions: {
      less: {
        // 支持内联 javascript
        javascriptEnabled: true,
      },
    },
  },
  // 入口
  build: {
    outDir: "www",
    rollupOptions: {
      input: {
        main: resolve("index.html"),
        jump: resolve("jump/jump.html"), // 添加 jump 文件作为额外入口
      },
    },
    minify: "terser",
    terserOptions: {
      compress: {
        //生产环境时移除console
        drop_console: true,
        drop_debugger: true,
      },
    },
  },
  base: "/", // 公共基础路径
});
