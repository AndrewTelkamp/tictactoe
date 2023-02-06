export function wait(time: number): Promise<unknown> {
  return new Promise((res: any) => {
    setTimeout(function () {
      res();
    }, time);
  });
}
