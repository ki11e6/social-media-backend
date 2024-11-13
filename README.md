# Social Media Platform

A full-featured social media platform built using Node.js, TypeScript, and MongoDB. This application allows users to interact through posts, private messages, and real-time notifications. It includes all the essential features expected in a modern social media application.

## Features

- **User Authentication**: Signup, login, forgot password, and reset password functionality.
- **Post Management**: Users can create, read, update, and delete posts.
- **Post Reactions**: Like and react to posts with various emojis.
- **Comments**: Comment on posts, and reply to comments.
- **Followers System**: Follow and unfollow users, and block/unblock them.
- **Private Messaging**: Real-time messaging between users, supporting text, images, GIFs, and reactions.
- **Notifications**: Receive in-app and email notifications for new messages, comments, followers, and more.
- **Image Uploads**: Upload images to posts and chats, with integration to Cloudinary.
- **Scalable Background Jobs**: Handled with Redis and Bull for job processing (e.g., sending emails).
- **Real-time Features**: Implemented with Socket.io for real-time messaging and notifications.

## Tech Stack

- **Backend**: Node.js, Express.js, TypeScript
- **Frontend**: Custom front-end (optional section if front-end is included in the repo)
- **Database**: MongoDB, Mongoose
- **Cache**: Redis
- **Real-time Communication**: Socket.io
- **Job Processing**: Bull
- **Email**: Nodemailer, Sendgrid Mail
- **Cloud Storage**: Cloudinary
- **Deployment**: AWS EC2, Terraform, PM2 for process management
- **Testing**: Jest for unit and integration testing

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd social-media-platform
