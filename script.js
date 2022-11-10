const script =async  (params) => {
// wait for the dom to be ready
await new Promise((resolve, reject) => {
    document.addEventListener('DOMContentLoaded', () => {
        // do something
        console.log('DOM is ready');
        resolve();
    });

});
// get the first div element
const div = document.querySelector('div');
console.log('div', div);
console.log('getting the element');
// from div find div with class 'row px-lg-2'
const row = div.querySelector('.row.px-lg-2');
console.log('row', row);
// get all children of row
const children = row.children;
// console.log('children', children);
// loop through children
const result = [];
for (let i = 0; i < children.length; i++) {
    // get the child
    const child = children[i];
  // get div with class 'black font-semi-bold mb-2 wrap-content h-48px' from child as title
    const title = child.querySelector('.black.font-semi-bold.mb-2.wrap-content.h-48px');
    console.log('title', title.innerHTML); 
    // get div with class 'pl-1 md-grey primary fs-7 primary' as rating and if not found store 'N/A' in rating
    const rating = child.querySelector('.pl-1.md-grey.primary.fs-7.primary') || 'N/A';
    console.log('rating', rating.innerHTML);
    // get div with class 'pl-1 md-grey primary fs-7 ng-star-inserted' as duration 
    const durationStringFromDiv = child.querySelector('.pl-1.md-grey.primary.fs-7.ng-star-inserted');
    console.log('durationStringFromDiv', durationStringFromDiv.innerHTML);
    // split durationStringFromDiv by space and get the first element as number and second element as unit (mins or hrs)
    const [number, unit] = durationStringFromDiv.innerHTML.split(' ');
    console.log('number', number);
    console.log('unit', unit);
    let durationInHours = 0;
    if(unit === 'mins') {
        durationInHours = number / 60;
    } else {
        durationInHours = number;
    }
    console.log('durationInHours', durationInHours);
    // git div with class 'pl-1 md-grey primary fs-6 ng-star-inserted' as level
    const level = child.querySelector('.pl-1.md-grey.primary.fs-6.ng-star-inserted');
    console.log('level', level.innerHTML);
    // get div with class 'd-block tertiary-bg text-center my-3 py-2 radius-8 text-white text-decoration-none fs-1 font-weight-lighter fs-9 z-0 ng-star-inserted' as endpoint and add 'https://codered.eccouncil.org/course/' to it
    const endpoint = child.querySelector('.d-block.tertiary-bg.text-center.my-3.py-2.radius-8.text-white.text-decoration-none.fs-1.font-weight-lighter.fs-9.z-0.ng-star-inserted');
    // get the href attribute from endpoint
    const href = endpoint.getAttribute('href');
    console.log('endpoint', 'https://codered.eccouncil.org' + href);
    // get div with class 'badge badge-info py-1 px-4 font-regular font-weight-lighter mx-2 included-tag-color ng-star-inserted' as isPaid
    const isPaid = child.querySelector('.badge.badge-info.py-1.px-4.font-regular.font-weight-lighter.mx-2.included-tag-color.ng-star-inserted');
    if(isPaid) {
        console.log('isPaid', true);
        console.log('isPaid', isPaid.innerHTML);
    }
    // get div with class 'badge badge-info py-1 px-4 font-regular font-weight-lighter mx-2 free_background ng-star-inserted' as isFree
      const isFree = child.querySelector('.badge.badge-info.py-1.px-4.font-regular.font-weight-lighter.mx-2.free_background.ng-star-inserted');
      if(isFree) {
      console.log('isFree', true);
      console.log('isFree', isFree.innerHTML);
      } else{
        console.log('isFree', false);
      }
      // innerHTML of isPaid or isFree whichever is found
      const courseType = isPaid || isFree;
      console.log('courseType', courseType.innerHTML);
      const isCourseTypeFree = isFree ? true : false;
      console.log('isCourseTypeFree', isCourseTypeFree);

      // get img with class 'img-fluid card-image' as image and get the src attribute
      const image = child.querySelector('.img-fluid.card-image');
      const src = image.getAttribute('src');
      console.log('image', src);
    
    const obj = {
        title: title.innerHTML,
        rating: rating.innerHTML,
        durationInHours: durationInHours * 1,
        duration: durationStringFromDiv.innerHTML,
        level: level.innerHTML,
        endpoint: 'https://codered.eccouncil.org' + href,
        courseType: courseType.innerHTML,
        isCourseTypeFree: isCourseTypeFree,
        image: src
    }
console.clear()
    // loop through the object and and remove /n from the values of keys
    try {
      // start console
      console.log('start');
      for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
          const element = obj[key];
// if value is string then remove /n from it
          if(typeof element === 'string') {
            obj[key] = element.replace(/(\r\n|\n|\r)/gm, "");
            // remove extra spaces
            obj[key] = obj[key].replace(/\s+/g, ' ').trim();

          }
        }
      }
      // end console
      console.log('end');
    } catch (error) {
      console.log('error', error);
    }
    console.log('completed...')
    // console.clear();
    console.log('completed...')
    console.log('obj', obj);
    result.push(obj);
}

console.clear();
// sum of durationInHours
const sum = result.reduce((acc, curr) => {
    return acc + curr.durationInHours;
}, 0);
console.log('sum', sum);
// console saving the result
console.log('saving the result...');
// save the result in a json file
// ask use to save the file
const save = confirm('Do you want to save the result?');
if(save) {
    // save the result in a json file
    const json = JSON.stringify(result);
    const blob = new Blob([json], {type: "application/json"});
    const url  = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.download    = "result.json";
    a.href        = url;
    a.textContent = "Download file!";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    console.log('result saved');
} else {
    console.log('result not saved');
}

console.log('saved the result...');
}

script();