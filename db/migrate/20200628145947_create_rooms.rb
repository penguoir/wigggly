class CreateRooms < ActiveRecord::Migration[6.0]
  def change
    create_table :rooms do |t|
      t.text :video_url
      t.string :code

      t.timestamps
    end
    add_index :rooms, :code, unique: true
  end
end
