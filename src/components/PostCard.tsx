"use client";

import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Avatar,
  Button,
  Image,
} from "@nextui-org/react";
import { HeartIcon, MessageCircle, Repeat2Icon, ShareIcon } from "lucide-react";

export default function PostCard() {
  const [isFollowed, setIsFollowed] = useState(false);

  return (
    <Card className="lg:w-[700px]">
      <CardHeader className="justify-between">
        <div className="flex gap-5">
          <Avatar
            isBordered
            radius="full"
            size="md"
            src="https://nextui-docs-v2.vercel.app/images/hero-card-complete.jpeg"
          />
          <div className="flex flex-col gap-1 items-start justify-center">
            <h4 className="text-small font-semibold leading-none text-default-600">
              Zoey Lang
            </h4>
            <h5 className="text-small tracking-tight text-default-400">
              @zoeylang
            </h5>
          </div>
        </div>
        <Button
          className={
            isFollowed
              ? "bg-transparent text-foreground border-default-200"
              : ""
          }
          color="primary"
          radius="full"
          size="sm"
          variant={isFollowed ? "bordered" : "solid"}
          onPress={() => setIsFollowed(!isFollowed)}
        >
          {isFollowed ? "Unfollow" : "Follow"}
        </Button>
      </CardHeader>
      <CardBody className="px-3 py-0 text-small text-default-400 overflow-visible">
        <p>
          Frontend developer and UI/UX enthusiast. Join me on this coding
          adventure!
        </p>
        <Image
          width={700}
          alt="NextUI hero Image"
          className="w-full object-cover my-2"
          src="https://nextui-docs-v2.vercel.app/images/hero-card-complete.jpeg"
        />
        <span className="pt-2">
          #FrontendWithZoey
          <span className="py-2" aria-label="computer" role="img">
            💻
          </span>
        </span>
      </CardBody>
      <CardFooter className="gap-6">
        <div className="flex gap-1 items-center group/comment hover:text-primary cursor-pointer">
          <div className="group-hover/comment:bg-primary-100 rounded-full p-1.5">
            <MessageCircle className="w-5 h-5" />
          </div>
          <p className="font-semibold text-small">4</p>
          {/* <p className=" text-small">Upvote</p> */}
        </div>
        <div className="flex gap-1 items-center group/upvote hover:text-green-600 cursor-pointer">
          <div className="group-hover/upvote:bg-green-200 rounded-full p-1.5">
            <Repeat2Icon className="w-5 h-5" />
          </div>
          <p className="font-semibold text-small">4</p>
          {/* <p className=" text-small">Upvote</p> */}
        </div>
        <div className="flex gap-1 items-center group/like hover:text-danger cursor-pointer">
          <div className="group-hover/like:bg-danger-100 rounded-full p-1.5">
            <HeartIcon className="w-5 h-5" />
          </div>
          <p className="font-semibold text-small">4</p>
          {/* <p className=" text-small">Likes</p> */}
        </div>
        <div className="flex gap-1 items-center group/share hover:text-primary cursor-pointer">
          <div className="group-hover/share:bg-primary-100 overflow-visible rounded-full p-1.5">
            <ShareIcon className="w-5 h-5" />
          </div>
          {/* <p className=" text-small">Share</p> */}
        </div>
      </CardFooter>
    </Card>
  );
}
