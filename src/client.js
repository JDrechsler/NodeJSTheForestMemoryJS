var socket = io()

var vueVars = {
    status: 'works',
    foregroundApp: '',
    processName: 'TheForest.exe',
    hacks: {
        unlimitedRes: {
            activated: false,
            aob: 'BHGGFJKJHK9876KMJHG',
            foundAddress: 3434
        }
    }
}

var vueMethods = {
    activateHack() {
        socket.emit('request-processes')
    },
    activateUnlimitedRes() {
        socket.emit('request-activateUnlimitedRes')
    }
}

var vueComputed = {

}

var vueWatchers = {

}

socket.emit('halloVonClient')
socket.on('halloVonServer', function (message) {
    vueVars.status = 'works and connected to server'
    console.log(message)
})

socket.on('response-foregroundApp', function (foregroundApp) {
    vueVars.foregroundApp = foregroundApp
})

socket.on('response-processes', function (processes) {
    for (var i = 0; i < processes.length; i++) {
        var process = processes[i]
        if (process.szExeFile === vueVars.processName) {
            vueVars.status = `${vueVars.processName} found!`
            break
        } else {
            vueVars.status = `${vueVars.processName} could not be found!`
        }
    }
    console.log(vueVars.status)
})

document.addEventListener("DOMContentLoaded", () => {
    new Vue({
        el: '#app',
        data: vueVars,
        methods: vueMethods,
        computed: vueComputed,
        watch: vueWatchers
    })

    document.ondragover = document.ondrop = (ev) => {
        ev.preventDefault();
    }
    document.body.ondrop = (ev) => {
        ev.preventDefault();
    }
})