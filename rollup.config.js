import css from 'rollup-plugin-css-only';

export default {
  // ... other configuration ...

  plugins: [
    // ... other plugins ...

    css({
      output: "./Keyboard.module.css", // Output path for the generated CSS file
    }),
  ],
};
