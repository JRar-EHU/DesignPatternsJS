import * as readline from 'node:readline';

export default class ConsoleInput {
  private constructor() {
    // Синглтон
  }

  private static instance: ConsoleInput;

  private rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  static getInstance(): ConsoleInput {
    if (!ConsoleInput.instance) {
      ConsoleInput.instance = new ConsoleInput();
    }
    return ConsoleInput.instance;
  }

  ask(question: string): Promise<string> {
    return new Promise((resolve) => {
      this.rl.question(`${question} `, (answer) => resolve(answer.trim()));
    });
  }

  async askYesNo(question: string): Promise<boolean> {
    const answer = await this.ask(`${question} (y/n)`);
    return answer.toLowerCase() === 'y';
  }

  close(): void {
    this.rl.close();
  }
}
