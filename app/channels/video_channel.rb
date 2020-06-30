class VideoChannel < ApplicationCable::Channel
  def subscribed
    stream_from "video_channel"
  end

  # Called when the video has been changed by a user
  def update_video_url(data)
    ActionCable.server.broadcast("video_channel", ['update_video_url', data["url"]])
  end

  def update_video_is_playing(data)
    ActionCable.server.broadcast("video_channel", ["update_video_is_playing", data["shouldPlay"]])
  end

  def update_video_position(data)
    ActionCable.server.broadcast("video_channel", ["update_video_position", data["position"]])
  end
end
