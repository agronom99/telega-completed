"use strict"
//==========================================
const TELEGRAM_BOT_TOKEN = '6668666199:AAGHMmXVcxlkZrtE27vZnFSDQCTwQvKFKaw';
const TELEGRAM_CHAT_ID = '@VitaL_chat';
const API = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`


async function sendEmailTelegram(event) {
    event.preventDefault();

    const form = event.target;

    // console.log(form);

    const formBtn = document.querySelector('.form__submit-button button')
    const formSendResult = document.querySelector('.form__send-result')
    formSendResult.textContent = '';


    const {  name, email, phone, pass } = Object.fromEntries(new FormData(form).entries());
    
    const text = `Заявка з сайту "Форма на телеграм":\n Прохання від: ${name}!\nEmail: ${email}\nPhone: ${phone}\nПаспортні данні: ${pass}`;
console.log(text);

    try {
        formBtn.textContent = 'Loading...';

        const response = await fetch(API, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                chat_id: TELEGRAM_CHAT_ID,
                text,
            })
        })
        
        if (response.ok) {
            formSendResult.textContent = 'Дякую за ваше повідомлення! Незабаром ми зв’яжемось з вами.';
            form.reset()
        } else {
            throw new Error(response.statusText);
        }

    } catch (error) {
        console.error(error);
        formSendResult.textContent = 'Анкета не надсилається! Спробуй пізніше.';
        formSendResult.style.color = 'red';

    } finally {
        formBtn.textContent = 'Відправити';
    }
}