let icon = blockies.create({
  seed: '0x0000000000000000000000000000000000000000',
  color: '#999', // to manually specify the icon color, default: random
  bgcolor: '#37cdbe', // choose a different background color, default: random
  spotcolor: '#2aa79b',
  size: 10,
});

window.addEventListener('load', () => {
  document.querySelector('#avatar-container').appendChild(icon);
});
