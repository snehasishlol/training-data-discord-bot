import fs from 'fs';

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

        const filter = m => m.author.bot == false;

        const inputCollector = message.channel.createMessageCollector({
            max: 1,
            filter,
            time: 600000,
            errors: ['time']
        });

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
                        let obj = JSON.parse(data);
                        obj.data.push({
                            input: `${input.content}`,
                            output: `${output.content}`
                        });
                        let json = JSON.stringify(obj, null, 4);
                        fs.writeFile('data/training.json', json, 'utf8', () => message.channel.send('Done.'));
                        message.channel.send('File saved.')
                    }
                });
            })

            outputCollector.on('end', async (collected) => message.channel.send('Output Collected.'));


        })

        inputCollector.on('end', async (collected) => message.channel.send('Input Collected.'))

    }
}
