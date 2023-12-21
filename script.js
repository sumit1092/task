
const accordian = document.querySelectorAll('.accordian');

accordian.forEach(accordian =>{
    const icon = accordian.querySelector('.icon');
    const ans = accordian.querySelector('.ans');

    accordian.addEventListener('click',()=>{
        icon.classList.toggle('active');
        ans.classList.toggle('active');
    })
})