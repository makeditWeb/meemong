// new numberRush('modelCnt', {
//     speed: 5,
//     steps: 100,
//     maxNumber: 12040
// })

// new numberRush('designerCnt', {
//     speed: 5,
//     steps: 10,
//     maxNumber: 1746
// })

// new numberRush('mouCnt', {
//     speed: 5,
//     steps: 100,
//     maxNumber: 7700
// })
// new numberRush('userCnt', {
//     speed: 5,
//     steps: 100,
//     maxNumber: 13786
// })
/**
 * document.getElementById('modelCnt').innerText = data.modelCount;
            document.getElementById('designerCnt').innerText = data.designerCount;
            document.getElementById('mouCnt').innerText = (data.activeUsers.Designer + data.activeUsers.Model)*30;
            document.getElementById('userCnt').innerText = data.modelCount + data.designerCount;
 */

fetch('/un/count')
    .then(response => response.json())
    .then(data => {
        new numberRush('modelCnt', {
            speed: 5,
            steps: 100,
            maxNumber: data.modelCnt
        });

        new numberRush('designerCnt', {
            speed: 5,
            steps: 10,
            maxNumber: data.designerCnt
        });

        new numberRush('mouCnt', {
            speed: 5,
            steps: 100,
            maxNumber: (data.activeUsers.Designer + data.activeUsers.Model)*30
        });

        new numberRush('userCnt', {
            speed: 5,
            steps: 100,
            maxNumber: data.modelCnt + data.designerCount,
        });
    })
    .catch(error => console.error('Error fetching count data:', error));



const bodyRect = document.body.getBoundingClientRect().top;
let lastKnownScrollPosition = 0;
const sections = document.getElementsByTagName('section')
const navList = document.querySelectorAll('nav ol li')
console.log('nav', navList)
const positionList = !sections ? [] : Array.from(sections).map((item, index)=>{
    return {
        id: item.id,
        positionY: item.getBoundingClientRect().top - bodyRect -120,
        bottomY: item.getBoundingClientRect().bottom - bodyRect-120
    }
}).filter((item)=>item.id !== "");

console.log('positionList', positionList)

document.addEventListener('scroll', e => {
    currScrollY = window.scrollY
    console.log('currScrollY',currScrollY)
    for(let i=0; i<positionList.length; i++) {
        const section = positionList[i]
        if(currScrollY >= section.positionY){
            console.log('매칭', section.id)
            navList[i].classList.add('active')
        }
        if(currScrollY > section.bottomY || currScrollY <= section.positionY) {
            console.log('나감')
            navList[i].classList.remove('active')
        }
    }
})


document.addEventListener('DOMContentLoaded', () => {
    const nav = document.querySelector('nav');
    const coverSection = document.querySelector('.cover');
    const navHeight = nav.offsetHeight;

    document.addEventListener('scroll', () => {
        // Nav 고정
        const coverBottom = coverSection.getBoundingClientRect().bottom;
        if (coverBottom < navHeight) {
            nav.classList.add('fixed');
        } else {
            nav.classList.remove('fixed');
        }

        // 섹션 도달 시 Nav Item 스타일 변경
        positionList.forEach((section, i) => {
            const sectionEl = document.getElementById(section.id);
            const sectionTop = sectionEl.getBoundingClientRect().top;
            const sectionBottom = sectionEl.getBoundingClientRect().bottom;

            if (sectionTop <= navHeight && sectionBottom >= navHeight) {
                navList[i].classList.add('active');
            } else {
                navList[i].classList.remove('active');
            }
        });
    });

    // Nav Item 클릭 이벤트
    navList.forEach((item, i) => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const sectionId = positionList[i].id;
            const sectionEl = document.getElementById(sectionId);

            window.scrollTo({
                top: sectionEl.offsetTop - navHeight,
                behavior: 'smooth',
            });
        });
    });
});


// slide


$('.app_slide').slick({
  dots: true,
  arrows: false,
  infinite: true,
  speed: 300,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3000,
  centerMode: true,

});

$('.model-list').slick({
    dots: false,
    arrows: false,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    centerMode: true,
  
  });
