document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('.header');
    const hashtags = document.querySelector('.hashtags');
    const body = document.body;

    window.addEventListener('scroll', () => {
        const space = header.getBoundingClientRect().height;

        if(hashtags.getBoundingClientRect().top <= 0) {
            header.classList.add('header--fixed');
            body.style.setProperty('--space-top', `${space}px`);
            return;
        }

        header.classList.remove('header--fixed');
        body.style.setProperty('--space-top', '0px')
    })
});