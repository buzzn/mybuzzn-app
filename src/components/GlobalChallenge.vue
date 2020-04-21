<template>
    <div class="globalChallenge">
      <div v-if="!isLoading && !globalChallenge.benchmark">
        <h3 v-html="$options.filters.translate('global-challenge-claim')"></h3>
        <h6 v-html="$options.filters.translate('global-challenge-subline')"></h6>
        <div class="amount">
          <p v-html="$options.filters.translate('neutral-savings-text')"></p>
          <counter unit="kWh" :number="Math.round(globalChallenge.totalPrognose/1000/1000/1000) || 0"></counter>
        </div>
        <div class="personal">
          <p v-if="!globalChallenge.pending" v-html="$options.filters.translate('global-challenge-no-benchmark')"></p>
          <p v-if="globalChallenge.pending" v-html="$options.filters.translate('global-challenge-benchmark-pending')"></p>
        </div>
      </div>
      <div v-if="!isLoading && globalChallenge.benchmark">
        <h3 v-html="$options.filters.translate('global-challenge-claim')"></h3>
        <h6 v-html="$options.filters.translate('global-challenge-subline')"></h6>
        <div class="earth">
          <div class="earth__mask">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 347 211" height="210.258" width="346.694"><path stroke="#000" stroke-width="5" d="M157.599 65.562c1.344.762 5-3 5-3l-1.5-3c-.5-1-2-2.5-2-2.5l2-3s-.5-2.5-2-2-3 5-3 5-1.5 2.5 0 2.5 3 1.5 3 1.5 0 1.5-1.5 1.5-1.345 2.24 0 3zM123.432 53.996c3.019-.967 3.5-8 4.5-8.5s6-1.5 6-1.5l1.5-3.5h3s5.5-2 5.5-3-3-4-1.5-5 5.836-2.188 6-4.5c.164-2.311-3-.5-1.5-1.5s0-4 0-4-1.5-3 0-3.5 6.5-2.5 7-3.5-10 1.5-10 1.5-5.5 0-5.5-1.5 4.5-2.504 4-3.5-7 1.5-7 1.5-4.5-1.5-6-1.5-1.592 3.395-3.5 3.5c-1.908.106-1.274-2.155-2.5-2-1.226.156.5 2-1.5 2s-4.5-2-4.5-2-3.5 3.5-5 3.5-3 2-3 2-6.5 2-6 3.5 4 0 4 0v1.5h-2s0 2.5 2 2.5 4-1.5 7 0 1.5 8.5 1.5 8.5h3s-1.5 7.5-1.5 9 1.5 9 3 8.5-.019 2.468 3 1.5zM278.932 171.996c-3.689-.598-2.5-2-2.5-2s-.637-.863 0-1.5 2.5 1.5 2.5 0-2.5-7.5-2.5-7.5l2.5-5 5.5-3 1.5-3.5 5.5-3.5s1 2.5 2 2 2-3.5 2-3.5 5-1.5 5.5 0-1.5 3.5-1.5 3.5 3 1.5 5 1.5 1.19-7.227 2.5-7c1.31.227-.913 1.793 0 3.5s1.89-.075 3 2-1.5 5 0 5 1.647-.853 2.5 0-.788 2.212 0 3c.788.788 1.3-.7 2 0s-.43.946 0 2.5c.43 1.555.666-.511 1.5 2.5s1.643 5.01 0 7.5c-1.643 2.491-2.658.223-3.5 1.5-.842 1.277.609.53 0 2s-2.5 2.5-2.5 2.5-2 3-5.5 2.5-5-2.5-5-2.5v-2.5s-2.839 1.162-4 0c-1.161-1.161 0-3.5 0-3.5s-4.5-1.5-7 0-5.811 4.099-9.5 3.5z" fill="none"/><path stroke="#000" stroke-width="5" d="M161.932 73.496v4l-7 1.5s-2.655 5.782 0 6.5 4 3 5.5 1.5 4-4 4.5-6 7.5-3.5 7.5-3.5l4.5 3.5s3 1.5 1.5 3 3-1.5 3-1.5l-3-3.5s-3-2.5-1.5-3 6 3 6 3 .5 3.5 1.5 5 3 0 3 0-2-3 0-3 2.5-2 2.5-2 1.5-5.5 3-5.5h7s6 7.5 3 7.5-6-2-6-2h-4s-3 2-3 3.5 5 4.5 5 4.5h3.5s-1.5 6-1.5 6.5-4 0-4 0l-8.5-2.5-1.5 2.5s-7.5-.5-9-2.5 0-4 0-4-9-1.5-10.5 0-3 4-3 4h-5.5s-1 5.5-3.5 6-3.5 14.5-3.5 14.5l-1.5 1.5s6 13 8.5 13 11.5-4 13-3 3 3 6 3-1.5 5.5-1.5 5.5l3 5.5 1.5 7.5s-1.5 3.5-1.5 6.5 3 6.5 3 6.5v4.5l1.5 4s1.5 5.5 3 5.5h3l4-2s3-3.5 5-5.5 2-4 2-4 0-3 1.5-6 2.5-2.5 4.5-5 0-10 0-12 12-17 12-18.5-5 0-5 0-3 .5-5-2.5-8-19-8-19 7 16 10 16h8s6-4.5 6.5-6 1.5-6-2.5-6.5-1.084 2.132-4 1.5c-2.916-.631-5-5-5-5s0-3.5 2.5-3.5 8.5 7 10.5 7 8.5 2 9 3.5 3.5 2 4 0 2.5 17 4.5 17 3-8 3-8 5.997-11.607 10.5-11c4.503.608 3.5 6 3.5 6.5s-1.5 3 0 3h3s4 14.5 4.5 14.5 3 4 3.5 2-5-12-3.5-12 3.5 5 3.5 5l5.5-5-5.5-9s2.5-4.5 4-3 3.5 0 3.5 0 9.5-3.5 8.5-7-3.5-10-3.5-10l2-1.5-2-1.5h-2.5s-1-4.5 2.5-3 6.5 6.5 7.5 7.5 2.5-1.5 2.5-1.5l-2.5-4.5 2.5-5 6-4s3.5-8 0-9.5-6-2.5-6-2.5 2-7 4-7h10s1.5-4 5.5-3.5 0 7.5 0 7.5-1.5 7 0 7.5 5-4.5 5-4.5-3-7 0-7h5l2-3.5 3.5-1.5-1.5-3.5 1.5-3s5 3 6.5 3 2.5-3 2.5-3l-9-4-5.5-1.5-6.5-1.5v1.5h-6-1.5c-1.5 0-3.5 0-4-1.5s-5.5 0-5.5 0l-2-3h-6.5l-2-1.5s-.5 3-2 3h-6l-8-3s-.5 1.5-2 1.5-3.5-1.5-3.5-1.5l-6-1.5 1.5-3s-1-2.5-3-2.5h-5s.5-3-2-1.5-2 4-2 4h-10.5s-2.5 3 0 3-3.791-.321-4.5 1.5c-.708 1.822 3.566 3.29 2.5 4.5-1.066 1.21-5.433-4.4-7.5-3-2.067 1.4 1.149 5.745 0 6-1.149.255-1.5-7.5-3.5-7.5s-2 3-2 3l-1.5 1.5s4.134 1.679 3.5 3c-.634 1.322-8-1.5-8-1.5s1.036.464 0 1.5c-1.036 1.037-4.5 0-4.5 0s-3.5-1-5.5 1.5-10 7-10 7-4-4.5-2-4.5 5-2.5 5-2.5-9.5-6-15.5-4.5-7.5 4.5-7.5 4.5-2 9-4.5 9-4.5-2-4.5 1.5 1.5 5.5 1.5 5.5l3-2 3 4s1.5 2 3 0 1.5-4 1.5-4l-1.5-3.5 4.5-5s1.5-3 3-1.5-1.5 6.5-1.5 6.5l1.5 3.5s.431-2.12 1.5-1.5c1.07.62 0 5.5-1.5 5.5h-3s0 3-4.5 3h-6v-3s-3 0-3 1.5 1.5 4 1.5 4h-3s0 2-3 2c-1.5 0-1.5 2-1.5 2l-3 2.5 1.5 3zM98.432 198.496s-5-4-5-6.5v-8.5s2.5-28.5 0-31-10.5-12.5-11-15 4-7 4-10.5-2.5-5.5-2.5-5.5-7-2-9-6.5-7-3-7-3-9.5-4.5-10-8-10.5-14-10.5-14-7-9-1.5-16.5-8-17-8-17 .273-2.387-8-1.5c-8.273.888-16.5 9-18 8.5s7.418-4.894 6.5-7c-.918-2.105-4 0-4 0v-6.5s4.066-1.11 4-2.5c-.066-1.389-3.787-.688-4-2-.213-1.312 1.5-1.5 1.5-1.5s4.15 1.023 4.5 0c.351-1.023-4.85-2.477-4.5-3.5.351-1.023 3.375 1.125 4.5 0s-1.745-.264 0-2.5c1.745-2.235 8-2 8-2l17.5 4.5 3.5-2.5h8.5l6 2.5 5.5 3.5v-3.5l7 1.5 3-1.5s1.5-4.5 3-4.5 1.5 2 1.5 2-2.5 2.5 0 2.5 2.5 3.5 2.5 3.5l-2.5 3.5s-7.5 6-7.5 7.5 3 3.5 3 3.5 5.5 2 7 3.5 0 3.5 0 4.5 4 0 4 0-1.5-3 0-4.5 1.5-5.5 1.5-5.5-.5-6.5 1.5-6.5 7.5 3 7.5 3-2 3.5 0 3.5 4-1.5 4-1.5 4.5 5.5 5 7 2 4.5 2 4.5-3 2-5 2-8.584 1.458-8.5 3c.084 1.543 8.5 0 8.5 2s-10.5 3.5-11 4.5 0 2 0 2-2.5 0-4 2.5.5 3.5-1.5 5.5-6.5 5.5-6.5 5.5 2.5 5 2.5 7-2.5 1.5-2.5 1.5-1.5-4-1.5-5.5-6-1.5-6-1.5v1.5h-3s-9.5-3-4 13c.813 2.364 4 0 4 0s1.868-3.918 3-3.5c1.132.419 0 6 0 6h3l3 4.5 4 3 5.5-3 6.5 3 4-1.5s10.5 7.5 11.5 11-2 4-2 4h7c3.5 0 9.5 4.5 9.5 4.5l-3 9s.5 8.5-2 10.5-6 1-6.5 3-3 7.5-3 7.5-4 5-5.5 4.5 0 4.5 0 4.5-1 1.5-3.5 1.5-2.5 5.5-2.5 5.5l-1.5 3.5v5l-2.5 6.5z" fill="none"/></svg>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 347 211" height="210.258" width="346.694"><path stroke="#000" stroke-width="5" d="M157.599 65.562c1.344.762 5-3 5-3l-1.5-3c-.5-1-2-2.5-2-2.5l2-3s-.5-2.5-2-2-3 5-3 5-1.5 2.5 0 2.5 3 1.5 3 1.5 0 1.5-1.5 1.5-1.345 2.24 0 3zM123.432 53.996c3.019-.967 3.5-8 4.5-8.5s6-1.5 6-1.5l1.5-3.5h3s5.5-2 5.5-3-3-4-1.5-5 5.836-2.188 6-4.5c.164-2.311-3-.5-1.5-1.5s0-4 0-4-1.5-3 0-3.5 6.5-2.5 7-3.5-10 1.5-10 1.5-5.5 0-5.5-1.5 4.5-2.504 4-3.5-7 1.5-7 1.5-4.5-1.5-6-1.5-1.592 3.395-3.5 3.5c-1.908.106-1.274-2.155-2.5-2-1.226.156.5 2-1.5 2s-4.5-2-4.5-2-3.5 3.5-5 3.5-3 2-3 2-6.5 2-6 3.5 4 0 4 0v1.5h-2s0 2.5 2 2.5 4-1.5 7 0 1.5 8.5 1.5 8.5h3s-1.5 7.5-1.5 9 1.5 9 3 8.5-.019 2.468 3 1.5zM278.932 171.996c-3.689-.598-2.5-2-2.5-2s-.637-.863 0-1.5 2.5 1.5 2.5 0-2.5-7.5-2.5-7.5l2.5-5 5.5-3 1.5-3.5 5.5-3.5s1 2.5 2 2 2-3.5 2-3.5 5-1.5 5.5 0-1.5 3.5-1.5 3.5 3 1.5 5 1.5 1.19-7.227 2.5-7c1.31.227-.913 1.793 0 3.5s1.89-.075 3 2-1.5 5 0 5 1.647-.853 2.5 0-.788 2.212 0 3c.788.788 1.3-.7 2 0s-.43.946 0 2.5c.43 1.555.666-.511 1.5 2.5s1.643 5.01 0 7.5c-1.643 2.491-2.658.223-3.5 1.5-.842 1.277.609.53 0 2s-2.5 2.5-2.5 2.5-2 3-5.5 2.5-5-2.5-5-2.5v-2.5s-2.839 1.162-4 0c-1.161-1.161 0-3.5 0-3.5s-4.5-1.5-7 0-5.811 4.099-9.5 3.5z" fill="none"/><path stroke="#000" stroke-width="5" d="M161.932 73.496v4l-7 1.5s-2.655 5.782 0 6.5 4 3 5.5 1.5 4-4 4.5-6 7.5-3.5 7.5-3.5l4.5 3.5s3 1.5 1.5 3 3-1.5 3-1.5l-3-3.5s-3-2.5-1.5-3 6 3 6 3 .5 3.5 1.5 5 3 0 3 0-2-3 0-3 2.5-2 2.5-2 1.5-5.5 3-5.5h7s6 7.5 3 7.5-6-2-6-2h-4s-3 2-3 3.5 5 4.5 5 4.5h3.5s-1.5 6-1.5 6.5-4 0-4 0l-8.5-2.5-1.5 2.5s-7.5-.5-9-2.5 0-4 0-4-9-1.5-10.5 0-3 4-3 4h-5.5s-1 5.5-3.5 6-3.5 14.5-3.5 14.5l-1.5 1.5s6 13 8.5 13 11.5-4 13-3 3 3 6 3-1.5 5.5-1.5 5.5l3 5.5 1.5 7.5s-1.5 3.5-1.5 6.5 3 6.5 3 6.5v4.5l1.5 4s1.5 5.5 3 5.5h3l4-2s3-3.5 5-5.5 2-4 2-4 0-3 1.5-6 2.5-2.5 4.5-5 0-10 0-12 12-17 12-18.5-5 0-5 0-3 .5-5-2.5-8-19-8-19 7 16 10 16h8s6-4.5 6.5-6 1.5-6-2.5-6.5-1.084 2.132-4 1.5c-2.916-.631-5-5-5-5s0-3.5 2.5-3.5 8.5 7 10.5 7 8.5 2 9 3.5 3.5 2 4 0 2.5 17 4.5 17 3-8 3-8 5.997-11.607 10.5-11c4.503.608 3.5 6 3.5 6.5s-1.5 3 0 3h3s4 14.5 4.5 14.5 3 4 3.5 2-5-12-3.5-12 3.5 5 3.5 5l5.5-5-5.5-9s2.5-4.5 4-3 3.5 0 3.5 0 9.5-3.5 8.5-7-3.5-10-3.5-10l2-1.5-2-1.5h-2.5s-1-4.5 2.5-3 6.5 6.5 7.5 7.5 2.5-1.5 2.5-1.5l-2.5-4.5 2.5-5 6-4s3.5-8 0-9.5-6-2.5-6-2.5 2-7 4-7h10s1.5-4 5.5-3.5 0 7.5 0 7.5-1.5 7 0 7.5 5-4.5 5-4.5-3-7 0-7h5l2-3.5 3.5-1.5-1.5-3.5 1.5-3s5 3 6.5 3 2.5-3 2.5-3l-9-4-5.5-1.5-6.5-1.5v1.5h-6-1.5c-1.5 0-3.5 0-4-1.5s-5.5 0-5.5 0l-2-3h-6.5l-2-1.5s-.5 3-2 3h-6l-8-3s-.5 1.5-2 1.5-3.5-1.5-3.5-1.5l-6-1.5 1.5-3s-1-2.5-3-2.5h-5s.5-3-2-1.5-2 4-2 4h-10.5s-2.5 3 0 3-3.791-.321-4.5 1.5c-.708 1.822 3.566 3.29 2.5 4.5-1.066 1.21-5.433-4.4-7.5-3-2.067 1.4 1.149 5.745 0 6-1.149.255-1.5-7.5-3.5-7.5s-2 3-2 3l-1.5 1.5s4.134 1.679 3.5 3c-.634 1.322-8-1.5-8-1.5s1.036.464 0 1.5c-1.036 1.037-4.5 0-4.5 0s-3.5-1-5.5 1.5-10 7-10 7-4-4.5-2-4.5 5-2.5 5-2.5-9.5-6-15.5-4.5-7.5 4.5-7.5 4.5-2 9-4.5 9-4.5-2-4.5 1.5 1.5 5.5 1.5 5.5l3-2 3 4s1.5 2 3 0 1.5-4 1.5-4l-1.5-3.5 4.5-5s1.5-3 3-1.5-1.5 6.5-1.5 6.5l1.5 3.5s.431-2.12 1.5-1.5c1.07.62 0 5.5-1.5 5.5h-3s0 3-4.5 3h-6v-3s-3 0-3 1.5 1.5 4 1.5 4h-3s0 2-3 2c-1.5 0-1.5 2-1.5 2l-3 2.5 1.5 3zM98.432 198.496s-5-4-5-6.5v-8.5s2.5-28.5 0-31-10.5-12.5-11-15 4-7 4-10.5-2.5-5.5-2.5-5.5-7-2-9-6.5-7-3-7-3-9.5-4.5-10-8-10.5-14-10.5-14-7-9-1.5-16.5-8-17-8-17 .273-2.387-8-1.5c-8.273.888-16.5 9-18 8.5s7.418-4.894 6.5-7c-.918-2.105-4 0-4 0v-6.5s4.066-1.11 4-2.5c-.066-1.389-3.787-.688-4-2-.213-1.312 1.5-1.5 1.5-1.5s4.15 1.023 4.5 0c.351-1.023-4.85-2.477-4.5-3.5.351-1.023 3.375 1.125 4.5 0s-1.745-.264 0-2.5c1.745-2.235 8-2 8-2l17.5 4.5 3.5-2.5h8.5l6 2.5 5.5 3.5v-3.5l7 1.5 3-1.5s1.5-4.5 3-4.5 1.5 2 1.5 2-2.5 2.5 0 2.5 2.5 3.5 2.5 3.5l-2.5 3.5s-7.5 6-7.5 7.5 3 3.5 3 3.5 5.5 2 7 3.5 0 3.5 0 4.5 4 0 4 0-1.5-3 0-4.5 1.5-5.5 1.5-5.5-.5-6.5 1.5-6.5 7.5 3 7.5 3-2 3.5 0 3.5 4-1.5 4-1.5 4.5 5.5 5 7 2 4.5 2 4.5-3 2-5 2-8.584 1.458-8.5 3c.084 1.543 8.5 0 8.5 2s-10.5 3.5-11 4.5 0 2 0 2-2.5 0-4 2.5.5 3.5-1.5 5.5-6.5 5.5-6.5 5.5 2.5 5 2.5 7-2.5 1.5-2.5 1.5-1.5-4-1.5-5.5-6-1.5-6-1.5v1.5h-3s-9.5-3-4 13c.813 2.364 4 0 4 0s1.868-3.918 3-3.5c1.132.419 0 6 0 6h3l3 4.5 4 3 5.5-3 6.5 3 4-1.5s10.5 7.5 11.5 11-2 4-2 4h7c3.5 0 9.5 4.5 9.5 4.5l-3 9s.5 8.5-2 10.5-6 1-6.5 3-3 7.5-3 7.5-4 5-5.5 4.5 0 4.5 0 4.5-1 1.5-3.5 1.5-2.5 5.5-2.5 5.5l-1.5 3.5v5l-2.5 6.5z" fill="none"/></svg>
          </div>
        </div>
        <div class="personal">
          <p>{{ 'benchmark-text' | translate }}<strong>{{ Intl.NumberFormat('de-DE').format((globalChallenge.benchmark/1000/1000/10000).toFixed(2)) }} kWh</strong>.</p>
          <p>{{ 'prognose-text' | translate }} <strong>{{ Intl.NumberFormat('de-DE').format((globalChallenge.benchmark/1000/1000/10000 - globalChallenge.prognose/1000/1000/10000).toFixed(2)) }} kWh</strong>
          <p>{{ 'saving-prognose' | translate }}</p>
          <counter unit="kWh" :number="Math.min(Math.round(globalChallenge.benchmark/1000/1000/10000 - globalChallenge.prognose/1000/1000/10000), 0)"></counter>
        </div>
        <div class="amount">
          <p v-if="(globalChallenge.prognose) > 0"  v-html="$options.filters.translate('positive-savings-text')"></p>
          <p v-if="(globalChallenge.prognose) <= 0" v-html="$options.filters.translate('negative-savings-text')"></p>
          <counter unit="kWh" :number="Math.max((globalChallenge.totalPrognose/1000/1000/1000), 0)"></counter>
        </div>
        <div class="button">
          <field-button @click="openLandingpage" :label="'Mehr erfahren'"></field-button>
        </div>
        <div class="hint">
          <small>{{ 'term-hint' | translate }}</small>
          <small>{{ 'year-hint' | translate }}</small>
        </div>
      </div>
      <div v-if="isLoading" class="section-loader">
        <loading-icon :white="true"></loading-icon>
      </div>
    </div>

</template>

<script>
import GreatNumber from '@/components/GreatNumber';
import Counter from '@/components/Counter';
import FieldButton from '@/components/FieldButton';
import APIService from '../services/APIService';
import GlobalChallengeState from '../states/GlobalChallengeState';
import LoadingIcon from './LoadingIcon';


export default {
  name: 'GlobalChallenge',
  components: {
    GreatNumber,
    Counter,
    FieldButton,
    LoadingIcon,
  },
  data() {
    return {
      isLoading: true,
      globalChallenge: GlobalChallengeState.state,
    };
  },
  mounted() {
    APIService.globalChallenge().then(() => { this.isLoading = false; });
  },
  methods: {
    openLandingpage() {
      window.open('https://einemillionsparen.de');
    },
  },
};
</script>

<style lang="scss">
@import "../assets/scss/variables";
@import "../assets/scss/animations";

.globalChallenge {
  margin: 1em 0 0;
  h3 {
    font-size: 35px;
    margin: 0 0 1em;
  }
  p {
    text-align: center;
    strong {
      font-size: 120%;
    }
    a {
      color: white;
      font-weight: bold;
      font-size: 120%;
    }
  }
  .earth {
    margin: 0 0 40px;
    &__mask {
      width: 120px;
      height: 120px;
      margin: 0 auto;
      border-radius: 50%;
      overflow: hidden;
      box-shadow: 0 0 50px rgba(255,255,255,0.3);
      border: 4px solid white;
      position: relative;
      -webkit-backface-visibility: hidden;
      -moz-backface-visibility: hidden;
      -webkit-transform: translate3d(0, 0, 0);
      -moz-transform: translate3d(0, 0, 0);
      svg {
        display: block;
        position: absolute;
        top: 50%;
        transform: translate(100%, -50%);
        height: 95%;
        width: 150%;
        left: 100%;
        animation: earthRotation 40000ms linear infinite;
        path {
          stroke: white;
        }
        &:nth-child(2) {
          animation-delay: 20000ms
        }
        @keyframes earthRotation {
          0% {
            transform: translate(0, -50%)
          }
          100% {
            transform: translate(-200%, -50%);
          }
        }
      }
    }
  }

  h5 {
    text-align: center;
    font-size: 25px;
    margin: 1em 0 0
  }
  h6 {
    font-size: 18px;
    margin: 0 0 2em;
    line-height: 1.6em;
    text-align: center;
    font-weight: normal;
    strong {
      font-size: 120%;
    }
  }

  .saving {
    margin-top: 1em;
    border-top: 1px solid rgba($grey-1, 0.3);
  }

  .progress-bar {
      height: 18px;
      background: rgba($grey-1, 0.3);
      border-radius: 9px;
      position: relative;
      overflow: hidden;
      margin-bottom: 30px;
      .progress-indicator {
        width: 50%;
        position: absolute;
        top: 0;
        bottom: 0;
        right: 0;
        background: rgb(185,40,97);
        background: linear-gradient(0deg, #baca56 0%, #e5f679 100%);;
        border-radius: 9px;
        transition: width 500ms ease;
      }
    }

    .button {
      .field {
        button {
          color: white;
          background: rgb(74, 139, 177) !important;
          &:hover {
            background: darken(rgb(74, 139, 177), 10%) !important;
          }
        }
      }
    }

    .hint {
      margin: 2em 0 0;
      opacity: 0.5;
      text-align: left;
      small {
        display: block;
        margin-bottom: 0.5em;
      }
    }
}
</style>
