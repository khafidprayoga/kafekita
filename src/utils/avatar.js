let icon = blockies.create({
  seed: '0x0000000000000000000000000000000000000000',
  color: '#60A5FA', // choose a different background color, default: random
  bgcolor: '#A7F3D0', // to manually specify the icon color, default: random
  spotcolor: '#111827',
  size: 10,
});

window.addEventListener('load', () => {
  document.querySelector('#avatar-container').appendChild(icon);
});
