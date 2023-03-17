import fs from 'fs'; // we will use the NodeJS FS or File system module. We don't need to install this if you have NodeJS installed.

export default {
    exec: async (message) => {
        message.reply({
            content: `
      __Enter your training INPUT.__
      \`\`\`js
      {
        "input": <AwaitResponse>
      }
      \`\`\`
      `
        })

        const filter = m => m.author.bot == false; // Filter out the bots

        const inputCollector = message.channel.createMessageCollector({
            max: 1,
            filter,
            time: 600000,
            errors: ['time']
        }); // Valid for 600k ms

        inputCollector.on('collect', async (input) => {
            message.channel.send(`
        __INPUT RECEIVED. Enter the OUTPUT of the following input.__
        \`\`\`js
        {
          "input": "${input.content}",
          "output": <AwaitResponse>
        }
        \`\`\`
        `);

            const outputCollector = message.channel.createMessageCollector({
                max: 1,
                filter,
                time: 600000,
                errors: ['time']
            });

            outputCollector.on('collect', async (output) => {
                message.channel.send(`
          __OUTPUT RECEIVED.__
          \`\`\`js
          {
            "input": "${input.content}",
            "output": "${output.content}"
          }
          \`\`\`
          :white_check_mark: Saving your changes...
          `);

                fs.readFile('data/training.json', 'utf8', function readFileCallback(err, data) {
                    if (err) {
                        console.log(err);
                    } else {
                        let obj = JSON.parse(data); // parses the file
                        obj.data.push({
                            input: `${input.content}`,
                            output: `${output.content}`
                        });
                        let json = JSON.stringify(obj, null, 4); // converts to JSON, with `4` as the indent for formatting and multiple lines
                        fs.writeFile('data/training.json', json, 'utf8', () => message.channel.send('Done.')); // writes or edits the file
                        message.channel.send('File saved.')
                    }
                });
            })

            outputCollector.on('end', async (collected) => message.channel.send('Output Collected.'));


        })

        inputCollector.on('end', async (collected) => message.channel.send('Input Collected.'))

    }
}
