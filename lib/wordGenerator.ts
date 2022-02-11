import { randomInt } from 'crypto';
import { words } from '../utils/words';
import schedule from 'node-schedule';

export class WordGenerator {
  private static currentRandom: number;
  private static job: schedule.Job | undefined = undefined;

  static getRandomValue = () => {
    if (!WordGenerator.job) {
      WordGenerator.currentRandom = randomInt(words.length);
      console.log('A palavra inicial é', words[WordGenerator.currentRandom]);
      let scheduleRule = new schedule.RecurrenceRule();

      //Roda toda meia noite no horario de brasilia
      scheduleRule.tz = 'America/Sao_Paulo';
      scheduleRule.second = 0;
      scheduleRule.minute = 0;
      scheduleRule.hour = 0;

      WordGenerator.job = schedule.scheduleJob(scheduleRule, () => {
        WordGenerator.currentRandom = randomInt(words.length);
        console.log(
          'Bom dia! A palavra do dia é',
          words[WordGenerator.currentRandom]
        );
      });
    }

    return WordGenerator.currentRandom;
  };
}
