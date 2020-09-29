'use strict';

const CLOUD_WIDTH = 420;
const CLOUD_HEIGHT = 270;
const CLOUD_X = 100;
const CLOUD_Y = 10;
const GAP = 20;
const COLUMN_GAP = 50;
const PADDING = 30;
const FONT_LINE_HEIGHT = 16;
const BAR_WIDTH = 40;
const BAR_HEIGHT = 150;
const DESCRIPTION__HEIGHT = CLOUD_Y + PADDING + FONT_LINE_HEIGHT * 2;

const renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

const getMaxElement = function (arr) {
  let maxElement = arr[0];

  for (let index = 1; index < arr.length; index++) {
    if (arr[index] > maxElement) {
      maxElement = arr[index];
    }
  }

  return maxElement;
};

const getrandomInteger = function (min, max) {
  let rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(rand);
};

window.renderStatistics = function (ctx, players, times) {
  const maxTime = getMaxElement(times);

  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, `rgba(0, 0, 0, 0.3)`);
  renderCloud(ctx, CLOUD_X, CLOUD_Y, `rgba(255, 255, 255, 1)`);

  ctx.fillStyle = `rgba(0, 0, 0, 1)`;
  ctx.font = `bold ${FONT_LINE_HEIGHT}px "PT Mono"`;
  ctx.fillText(`Ура вы победили!`, CLOUD_X + PADDING, CLOUD_Y + PADDING);
  ctx.fillText(`Список результатов:`, CLOUD_X + PADDING, CLOUD_Y + PADDING + FONT_LINE_HEIGHT);

  for (let index = 0; index < players.length; index++) {
    const roundTime = Math.round(times[index]);

    ctx.fillStyle = `rgba(0, 0, 0, 1)`;

    ctx.fillText(
        `${players[index]}`,
        CLOUD_X + PADDING + (BAR_WIDTH + COLUMN_GAP) * index,
        CLOUD_Y + CLOUD_HEIGHT - GAP
    );

    ctx.fillText(
        `${roundTime}`,
        CLOUD_X + PADDING + (BAR_WIDTH + COLUMN_GAP) * index,
        (BAR_HEIGHT - (BAR_HEIGHT * times[index] / maxTime) + DESCRIPTION__HEIGHT + FONT_LINE_HEIGHT)
    );

    ctx.fillStyle = `hsl(240, ${getrandomInteger(0, 100)}%, 50%)`;
    if (players[index] === `Вы`) {
      ctx.fillStyle = `rgba(0, 0, 255, 1)`;
    }

    ctx.fillRect(
        CLOUD_X + PADDING + (BAR_WIDTH + COLUMN_GAP) * index,
        CLOUD_Y + CLOUD_HEIGHT - GAP - FONT_LINE_HEIGHT,
        BAR_WIDTH,
        ((BAR_HEIGHT * times[index] / maxTime)) * -1
    );

  }
};

