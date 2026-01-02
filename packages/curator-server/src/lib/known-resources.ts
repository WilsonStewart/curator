// import {
// 	at_audio_recordings,
// 	at_images,
// 	at_videos,
// } from "@/schemas/drizzle-schema/drizzle-schema.artifacts";
// import {
// 	et_youtubeChannels,
// 	et_youtubeVideos,
// } from "@/schemas/drizzle-schema/drizzle-schema.exhibits";
// import { rt_localFilesystem } from "@/schemas/drizzle-schema/drizzle-schema.repositories";

// export const knownResourceIds = {
// 	users: {
// 		SYSTEM: "019911be-0680-7fb9-84aa-694831111dad",
// 	},
// 	galleries: {
// 		ROOT: "019911c8-bfac-7f90-9e05-f9b681338ccc",
// 	},
// 	musuems: {
// 		DEFAULT_MUSEUM: "019911c3-0611-7f70-8432-085904fd7cc2",
// 	},
// };

// export const knownTypeIds = {
// 	exhibits: {
// 		byId: {
// 			"019911c8-781f-7e79-8dc5-bc1c798cc5dc": {
// 				name: "YouTube Video",
// 				table: et_youtubeVideos,
// 			},
// 			"019911c8-27fc-7e81-9293-6f6cd3265e5a": {
// 				name: "YouTube Channel",
// 				table: et_youtubeChannels,
// 			},
// 		},
// 		byTableName: {
// 			et_youtube_video: "019911c8-781f-7e79-8dc5-bc1c798cc5dc",
// 			et_youtube_channel: "019911c8-27fc-7e81-9293-6f6cd3265e5a",
// 		},
// 	},
// 	artifacts: {
// 		byId: {
// 			"019911c8-a343-770d-9b91-4dc6ed8f68cc": {
// 				name: "Audio Recording",
// 				table: at_audio_recordings,
// 			},
// 			"019911c9-9c4a-7515-9190-72f78e3fd93b": {
// 				name: "Video Recording",
// 				table: at_videos,
// 			},
// 			"019911c9-8ab8-7532-a2b6-74a0fbfed011": {
// 				name: "Image",
// 				table: at_images,
// 			},
// 		},
// 		byTableName: {
// 			at_audio: "019911c8-a343-770d-9b91-4dc6ed8f68cc",
// 			at_video: "019911c9-9c4a-7515-9190-72f78e3fd93b",
// 			at_image: "019911c9-8ab8-7532-a2b6-74a0fbfed011",
// 		},
// 	},
// 	repositories: {
// 		byId: {
// 			"019911ca-1ad8-70fc-a897-6e7f5c37eaa5": {
// 				name: "Local Filesystem",
// 				table: rt_localFilesystem,
// 			},
// 		},
// 		byTableName: {
// 			rt_local_filesystem: "019911ca-1ad8-70fc-a897-6e7f5c37eaa5",
// 		},
// 	},
// };

// export type TExhibitTypeId =
// 	| "019911c8-781f-7e79-8dc5-bc1c798cc5dc" // YouTube Video
// 	| "019911c8-27fc-7e81-9293-6f6cd3265e5a"; // YouTube Channel
