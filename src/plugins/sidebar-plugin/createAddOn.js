const svgNS = 'http://www.w3.org/2000/svg';

const createAddOn = nodeKey => {
  const wrapper = document.createElement('div');
  wrapper.classList.add('sidebar-addon');
  wrapper.setAttribute('data-id', nodeKey);

  // add plus icon
  const plusWrapper = document.createElement('div');
  plusWrapper.classList.add('plus');
  const plus = document.createElementNS(svgNS, 'svg');
  plus.setAttributeNS(null, 'viewBox', '0 0 18 18');
  plus.setAttributeNS(null, 'width', '14');
  plus.setAttributeNS(null, 'height', '14');
  plus.setAttributeNS(null, 'fill', 'rgba(55, 53, 47, 0.3)');
  const polygon = document.createElementNS(svgNS, 'polygon');
  polygon.setAttributeNS(
    null,
    'points',
    '17,8 10,8 10,1 8,1 8,8 1,8 1,10 8,10 8,17 10,17 10,10 17,10 '
  );
  plus.appendChild(polygon);
  plusWrapper.appendChild(plus);

  const selectableWrapper = document.createElement('div');
  selectableWrapper.classList.add('selectable');
  const selectable = document.createElementNS(svgNS, 'svg');
  selectable.setAttributeNS(null, 'viewBox', '0 0 10 10');
  selectable.setAttributeNS(null, 'width', '14');
  selectable.setAttributeNS(null, 'height', '14');
  selectable.setAttributeNS(null, 'fill', 'rgba(55, 53, 47, 0.3)');
  const path = document.createElementNS(svgNS, 'path');
  path.setAttributeNS(
    null,
    'd',
    'M3,2 C2.44771525,2 2,1.55228475 2,1 C2,0.44771525 2.44771525,0 3,0 C3.55228475,0 4,0.44771525 4,1 C4,1.55228475 3.55228475,2 3,2 Z M3,6 C2.44771525,6 2,5.55228475 2,5 C2,4.44771525 2.44771525,4 3,4 C3.55228475,4 4,4.44771525 4,5 C4,5.55228475 3.55228475,6 3,6 Z M3,10 C2.44771525,10 2,9.55228475 2,9 C2,8.44771525 2.44771525,8 3,8 C3.55228475,8 4,8.44771525 4,9 C4,9.55228475 3.55228475,10 3,10 Z M7,2 C6.44771525,2 6,1.55228475 6,1 C6,0.44771525 6.44771525,0 7,0 C7.55228475,0 8,0.44771525 8,1 C8,1.55228475 7.55228475,2 7,2 Z M7,6 C6.44771525,6 6,5.55228475 6,5 C6,4.44771525 6.44771525,4 7,4 C7.55228475,4 8,4.44771525 8,5 C8,5.55228475 7.55228475,6 7,6 Z M7,10 C6.44771525,10 6,9.55228475 6,9 C6,8.44771525 6.44771525,8 7,8 C7.55228475,8 8,8.44771525 8,9 C8,9.55228475 7.55228475,10 7,10 Z'
  );
  selectable.appendChild(path);
  selectableWrapper.appendChild(selectable);

  wrapper.appendChild(plusWrapper);
  wrapper.appendChild(selectableWrapper);

  return wrapper;
};

export default createAddOn;
