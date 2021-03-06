`use strict`;
class App{
    constructor(){
        this.state = {
            db: {
                users: []
            },
            locals: {
                newDb: [],
                contactsInput: '',
                keypadNumm: ''
            },
            logins: {
                login: 'dima',
                password: 'dima',
                loginConfirm: '',
                passwordConfirm: ''
            }
        }
        this.ui = {
            index: new Contacts(this.state),
            keypad: new Keypad(this.state),
            editContact: new EditUser(),
            user: new User(),
            addUser: new AddUser()
        }
        this.render('index');
        this.router();
    }

    router(){
        const main = document.querySelector('main');
        const updateState = (state) => {
            const regExpFunc = (string, a1, a2, a3) => [a1, a2.toUpperCase(), a3].join('');
            let newRegExpFunc = state.replace(/(\w*)-(\w)(\w*)/g, regExpFunc);
            newRegExpFunc = newRegExpFunc.replace(/.html/g, '');
            this.render(newRegExpFunc);
        }
        const links = [...document.body.querySelectorAll('a')];
        console.log(links)
        links.forEach(elem => {
            let href = elem.getAttribute('href');
            elem.addEventListener('click', e => {
                e.preventDefault();
                updateState(href);;
                history.pushState(href, href, href);
            })
            // elem.addEventListener('mousedown', (event) => {
            //     if(event.which == 2){
            //         e.preventDefault();
            //         updateState(href);;
            //         history.pushState(href, href, href);
            //         console.log('event', event)
            //     }
            // });
        });
        window.addEventListener('popstate', event => {
            updateState(e.state);
        })
    }

    render(page, user){;
        this.ui[page].requestUsers(user);
        this.router();
    }
}
const app = new App();