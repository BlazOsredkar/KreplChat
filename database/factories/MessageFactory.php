<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Group>
 */
class MessageFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {

        $sender_id = $this->faker->randomElement([0, 1]);
        if ($sender_id == 0) {
            $sender_id = $this->faker->randomElement(\App\Models\User::where('id', '!=', 1)->pluck('id')->toArray());
            $reciever_id = 1;
        } else {
            $reciever_id = $this->faker->randomElement(\App\Models\User::pluck('id')->toArray());
        }

        $group_id = null;
        if ($this->faker->boolean(50)) {
            $group_id = $this->faker->randomElement(\App\Models\Group::pluck('id')->toArray());
            $group = \App\Models\Group::find($group_id);
            $sender_id = $this->faker->randomElement($group->users->pluck('id')->toArray());
            $reciever_id = null;
        }

        return [
            'sender_id' => $sender_id,
            'group_id' => $group_id,
            'message' => $this->faker->realText(200),
            'receiver_id' => $reciever_id,
            'created_at' => $this->faker->dateTimeBetween('-1 year', 'now'),
        ];
    }
}