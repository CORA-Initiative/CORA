import React, { useEffect, useState } from "react";
import BackButton from "@/components/BackButton";
import { Avatar, Grid } from "@nextui-org/react";
import dynamic from "next/dynamic";

export default function ChangeProfile() {
  const title = "Settings";
  const subtitle = "Change Profile Picture";
  // const avatar = "../../../images/default_avatar.jpg";
  const avatar1 = "https://api.dicebear.com/5.x/personas/svg?seed=Kitty";
  const avatar2 = "https://api.dicebear.com/5.x/personas/svg?seed=Coco";
  const avatar3 = "https://api.dicebear.com/5.x/personas/svg?seed=Daisy";
  const avatar4 = "https://api.dicebear.com/5.x/personas/svg?seed=Garfield";

  // Change current profile
  const [currentProfile, setCurrentProfile] = useState(avatar1);

  return (
    <div className="p-12 md:px-24 pt-8">
      <BackButton />

      {/* Title */}
      <div className="flex flex-col py-2 mt-8 mb-4">
        <div className="">
          <p className="text-2xl font-normal">{title}</p>
        </div>
        {/* Subtitle */}
        <div className="mt-16">
          <p className="text-2xl font-extrabold">{subtitle}</p>
        </div>
      </div>

      {/* Account Details */}
      <div className="flex sm:flex-row flex-col gap-8 border mt-8">
        <div className="flex flex-col items-center gap-4">
          <p className="">Current Picture</p>

          <div className="flex h-28 w-28 rounded-full overflow-hidden border bg-coraBlue-2">
            <img
              id="currentProfile"
              className="inline-block h-28 w-28 rounded-full"
              src={currentProfile}
              alt=""
            />
          </div>
        </div>
      </div>

      {/* TODO: onclick of image, change profile and save */}
      {/* May change this by using an avatar component */}
      <div className="justify-between sm:mt-16 mt-0">
        <Grid.Container gap={2}>
          <Grid>
            <Avatar
              size="xl"
              src={avatar1}
              alt="avatar-girl-1"
              zoomed
              pointer
              onClick={() => setCurrentProfile(avatar1)}
            />
          </Grid>
          <Grid>
            <Avatar
              size="xl"
              src={avatar2}
              alt="avatar-girl-2"
              zoomed
              pointer
              onClick={() => setCurrentProfile(avatar2)}
            />
          </Grid>
          <Grid>
            <Avatar
              size="xl"
              src={avatar3}
              alt="avatar-boy-1"
              zoomed
              pointer
              onClick={() => setCurrentProfile(avatar3)}
            />
          </Grid>
          <Grid>
            <Avatar
              size="xl"
              src={avatar4}
              alt="avatar-boy-2"
              zoomed
              pointer
              onClick={() => setCurrentProfile(avatar4)}
            />
          </Grid>
        </Grid.Container>
      </div>

      <div className="mt-12">
        <button className="px-10 py-1 text-white font-bold text-lg bg-coraBlue-1 rounded hover:bg-coraBlue-4">
          Save changes
        </button>
      </div>
    </div>
  );
}
