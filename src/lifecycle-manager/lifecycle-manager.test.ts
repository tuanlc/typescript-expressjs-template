/**
 * Copyright (c) 2023 Adam Macklin
 * https://macklin.me/understanding-and-managing-the-node-js-application-lifecycle
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
import { expect } from 'chai';
import { lifecycle } from '.';

describe('lifecycle', () => {
  it('is open should return true', async () => {
    expect(lifecycle.isOpen()).to.eq(true);
  });

  it('run step function to ensure timely close', async () => {
    let steps = 0;
    const incrementStep = async () =>
      new Promise<void>((resolve) => {
        steps += 1;
        return resolve();
      });
    await lifecycle.delay(5000, incrementStep);
    expect(steps).to.eq(25);
  });

  it('close should fire listeners', async () => {
    let closed = false;
    lifecycle.on('close', async () => {
      closed = true;
    });
    await lifecycle.close();
    expect(closed).to.eq(true);
  });

  it('is open should return false', async () => {
    expect(lifecycle.isOpen()).to.eq(false);
  });
});
