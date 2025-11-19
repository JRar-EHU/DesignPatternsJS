/* eslint-disable */
import { BaseFactory } from './BaseFactory';
import Pyramid from '../entities/Pyramid';
import { Point } from '../entities/Point';
import {PyramidValidator} from "../validation/PyramidValidator";

export class PyramidFactory extends BaseFactory {

    static create(line: string): Pyramid {
        return this.safely(() => {
            PyramidValidator.validateLine(line);

            const { id, nums } = this.parseNumbers(line);
            const [bx1, by1, bz1, bx2, by2, bz2, ax, ay, az] = nums;

            return new Pyramid(
                id,
                new Point(bx1, by1, bz1),
                new Point(bx2, by2, bz2),
                new Point(ax, ay, az),
            );
        });
    }
}