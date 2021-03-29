import avatars1x from "./assets/images/1x/*.jpg"
import avatars2x from "./assets/images/2x/*.jpg"
import avatars3x from "./assets/images/3x/*.jpg"
import avatars4x from "./assets/images/4x/*.jpg"

const leadersTemplate = (data) => {
    const sortUsers = data.users.sort((a, b) => +a['valueText'].replace(/\D+/g,"") < +b['valueText'].replace(/\D+/g,"") ? 1 : -1)
                                .filter((_, i) => i < 5)
    return sortUsers.map((user, i) => {
        const colNum = `col__leaders col-${i + 1}__leaders`
        const emoji = !i ? `<b><div class='emoji__leaders'>${data.emoji}</div></b>` : ''
        const offsetLeft = !i ? 'left: 50%' : i % 2 ? 'left: calc(50% + 8px)' : 'left: calc(50% - 8px)'
        const avatar = (avatars) => {
            for (const avatar in avatars) {
                if (avatars.hasOwnProperty(avatar) && +avatar === +user.avatar.replace(/\D+/g,"")) {
                    return avatars[avatar]
                }
            }
        }

        return `
            <div class='${colNum}'>
                <div class='profile__leaders' style='${offsetLeft}'>
                    ${emoji}
                    <picture class='avatar__leaders'>
                        <source media="(min-width: 1024px)" srcset="${avatar(avatars4x)}">
                        <source media="(max-width: 768px)" srcset="${avatar(avatars2x)}">
                        <img src="${avatar(avatars1x)}" alt="${user.name}">
                    </picture>
                    <span class='name__leaders'>${user.name}</span>
                    <div class='score__leaders'>${user.valueText}</div>
                </div>
                <span class='place__leaders' style='${offsetLeft}'><b>${i + 1}</b></span>
            </div>
        `
    }).join('')
}

const voteTemplate = (data) => {
    return '<h2>vote</h2>'
}

window.renderTemplate = function(alias, data) {
    const display = (type) => {
        switch (type) {
            case 'leaders':
                return leadersTemplate(data)

            case 'vote':
                return voteTemplate(data)

            case 'chart':
                return '<h2>chart</h2>'

            case 'diagram':
                return '<h2>diagram</h2>'
        
            case 'activity':
                return '<h2>activity</h2>'
        
            default:
                return '<h2 class="no-data">no data</h2>'
        }
    }

    return `
        <hgroup>
            <h1><b>${data.title}</b></h1>
            <span>${data.subtitle}</span>
        </hgroup>
        <main>
            ${display(alias)}
        </main>
    `
}
