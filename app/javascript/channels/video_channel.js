import consumer from "./consumer"

let lastReminded;

const channel = consumer.subscriptions.create("VideoChannel", {
    connected() {
        toastr.info('Connected to room, please click and move around a bit so that we can get the video to play without the browser blocking autoplay.')
        this.install()
    },

    // Set up event listeners
    install() {
        // On video settings change
        $('#video_settings_form').submit(e => {
            // Update video url
            this.perform("update_video_url", { url: $('#room_video_url').val() })
        })
        
        // Play / pause the video
        $('#playpause').click(e => {
            let shouldPlay;

            if ($('#video').get(0).paused) {
                shouldPlay = true
            } else {
                shouldPlay = false
            }

            this.perform("update_video_is_playing", { shouldPlay })
        })

        $('#sync').click(e => {
            const position = $('#video').get(0).currentTime
            this.perform("update_video_position", { position })
        })

        $('#video').parent().click(e => {
            const delay = 1000 * 10
            if (!lastReminded || (new Date()) - lastReminded > delay) {
                lastReminded = new Date()
                toastr.error(`Please use the actions below to control the video for the entire room.`)
            }
        })
    },

    // Getting commands from the server
    // This action, payload thing is my choice, nothing by rails
    received([action, payload]) {
        switch (action) {
            // The video source has been changed
            case 'update_video_url':
                $('#video source').attr('src', payload)
                $('#video').get(0).load()
                toastr.info('Video changed to ' + payload)
                break

            // The video play state has been changed
            case 'update_video_is_playing':
                if (payload === true) {
                    $('#video').get(0).play()
                } else {
                    $('video').get(0).pause()
                    toastr.info("video paused")
                }
                break

            // The time of the video has been changed
            case 'update_video_position':
                $('#video').get(0).currentTime = payload
                console.log(payload / 60)
                toastr.info(`Video position changed to ${payload / 1000}`)
                break

            default:
                console.error(`Action ${action} hasn't been implemented yet.`)
        }
    }
});

