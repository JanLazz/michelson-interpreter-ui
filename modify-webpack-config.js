const fs = require('fs');

const filePath = './node_modules/react-scripts/config/webpack.config.js';
const codeInsertion1 = `
       fallback: {
         "crypto": require.resolve("crypto-browserify"),
         "stream": require.resolve("stream-browserify")
       },`;

const codeInsertion2 = `
           {
             test: /\.cjs$/,
             use: [
               {
                 loader: 'babel-loader',
                 options: {
                   presets: ['@babel/preset-env'],
                 },
               },
             ],
           },`;

fs.readFile(filePath, 'utf8', (err, data) => {
  if (err) {
    return console.log(err);
  }

  const lines = data.split('\n');
  lines.splice(312, 0, codeInsertion1);
  lines.splice(378, 0, codeInsertion2);
  const newFileContent = lines.join('\n');

  fs.writeFile(filePath, newFileContent, 'utf8', (err) => {
    if (err) return console.log(err);
    console.log('Changes made successfully!');
  });
});
