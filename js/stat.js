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
const GRAPH_COLOR_PLAYER = `rgba(0, 0, 255, 1)`;
const TEXT_COLOR = `rgba(0, 0, 0, 1)`;


function renderCloud(ctx, x, y, color, cloudWidth = CLOUD_WIDTH, cloudHeight = CLOUD_HEIGHT) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, cloudWidth, cloudHeight);
}


function renderWindow(descriptionTextArray, ctx) {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, `rgba(0, 0, 0, 0.3)`);
  renderCloud(ctx, CLOUD_X, CLOUD_Y, `rgba(255, 255, 255, 1)`);

  ctx.fillStyle = TEXT_COLOR;
  ctx.font = `bold ${FONT_LINE_HEIGHT}px "PT Mono"`;

  descriptionTextArray.forEach((item, index) => {
    if (index < 3) {
      ctx.fillText(String(item), CLOUD_X + PADDING, CLOUD_Y + PADDING + (FONT_LINE_HEIGHT * index));
    }
  });
}


function getMaxElementArray(arrayNumbers) {
  let maxElement = arrayNumbers[0];

  for (let index = 1; index < arrayNumbers.length; index++) {
    if (arrayNumbers[index] > maxElement) {
      maxElement = arrayNumbers[index];
    }
  }

  return maxElement;
}


function getRandomInteger(min, max) {
  return Math.round(min - 0.5 + Math.random() * (max - min + 1));
}


function getRandomColor() {
  return `hsl(240, ${getRandomInteger(0, 100)}%, 50%)`;
}


function drawGraph(darwParametrsObject, ctx) {
  const {time, name, nameStartY, timeStartY, graphStartX, graphStartY, graphHeight, graphWidth, graphColor} = darwParametrsObject;
  const roundTime = Math.round(time);

  ctx.fillStyle = TEXT_COLOR;

  ctx.fillText(
      String(name),
      graphStartX,
      nameStartY
  );
  ctx.fillText(
      String(roundTime),
      graphStartX,
      timeStartY
  );

  ctx.fillStyle = graphColor;

  ctx.fillRect(
      graphStartX,
      graphStartY,
      graphWidth,
      graphHeight
  );
}


window.renderStatistics = function (ctx, players, times) {
  renderWindow([`Ура вы победили!`, `Список результатов:`], ctx);

  const maxTime = getMaxElementArray(times);

  players.forEach((player, index) => {
    const drawParametrs = {
      time: times[index],
      name: player,
      nameStartY: CLOUD_Y + CLOUD_HEIGHT - GAP,
      timeStartY: (BAR_HEIGHT - (BAR_HEIGHT * times[index] / maxTime) + DESCRIPTION__HEIGHT + FONT_LINE_HEIGHT),
      graphStartX: CLOUD_X + PADDING + (BAR_WIDTH + COLUMN_GAP) * index,
      graphStartY: CLOUD_Y + CLOUD_HEIGHT - GAP - FONT_LINE_HEIGHT,
      graphHeight: ((BAR_HEIGHT * times[index] / maxTime)) * -1,
      graphWidth: BAR_WIDTH,
      get graphColor() {
        return this.name === `Вы` ? GRAPH_COLOR_PLAYER : getRandomColor();
      },
    };

    drawGraph(drawParametrs, ctx);
  });
};
