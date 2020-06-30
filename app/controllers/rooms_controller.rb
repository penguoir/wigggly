class RoomsController < ApplicationController
  before_action :set_room

  # GET /
  # GET /rooms/1
  def show; end

  # PATCH/PUT /rooms/1
  # PATCH/PUT /rooms/1.json
  def update
    # Assumption: only one room
    @room.update(room_params)
  end

  private

  # set_room before each action to get the room in scope
  def set_room
    # This assumes there is only one room
    @room = Room.find_or_create_by(id: 1)
  end

  # Only allow a list of trusted parameters through.
  def room_params
    params.require(:room).permit(:video_url)
  end
end
