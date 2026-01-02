import { VOwnerKVs, VTimestampKVs } from "./v-common";
import z from "zod";

const VETDYoutubeVideosSelect = z.object({
	exhibitId: z.string().uuid().nonempty(),
	youtubeId: z.string().nonempty(),
	youtubeChannelId: z.optional(z.string().nonempty()),
	title: z.string().nonempty(),
	description: z.optional(z.string().nonempty()),
	uploadDate: z.string().datetime().nonempty(),
});

const VETDYoutubeVideosInsert = VETDYoutubeVideosSelect;

const VETDYoutubeVideosUpdate = VETDYoutubeVideosSelect.omit({
	exhibitId: true,
})
	.partial()
	.refine((o) => Object.keys(0).length > 0, {
		message: "Type Data field object (YoutubeVideos) must not be empty.",
	});

const VETDYoutubeChannelsSelect = z.object({
	exhibitId: z.string().uuid().nonempty(),
	exhibitsTypeId: z.string().uuid().nonempty(),
	youtubeId: z.string().nonempty(),
	name: z.string().nonempty(),
});

const VETDYoutubeChannelsInsert = VETDYoutubeChannelsSelect;

const VETDYoutubeChannelsUpdate = VETDYoutubeChannelsSelect.omit({
	exhibitId: true,
})
	.partial()
	.refine((o) => Object.keys(o).length > 0, {
		message: "Type Data field object (YoutubeChannels) must not be empty.",
	});

const VExhibitsBaseSelect = z.object({
	id: z.string().uuid().nonempty(),
	name: z.string().nonempty(),
	exhibitTypeId: z.string().uuid().nonempty(),
	galleryId: z.string().uuid().nonempty(),
	museumId: z.string().uuid().nonempty(),
	...VOwnerKVs,
	...VTimestampKVs,
});

const VExhibitsBaseInsert = VExhibitsBaseSelect.omit({
	id: true,
	createdBy: true,
	createdAt: true,
	updatedAt: true,
}).refine((o) => Object.keys(o).length > 0, {
	message: "Data field object must not be empty.",
});

const VExhibitsBaseUpdate = VExhibitsBaseSelect.omit({
	id: true,
	createdBy: true,
	createdAt: true,
}).partial();

export const VExhibitsSelect = z.object({
	exhibits: VExhibitsBaseSelect,
	td_youtubeVideos: z.nullable(VETDYoutubeChannelsSelect),
	td_youtubeChannels: z.nullable(VETDYoutubeChannelsInsert),
});

export const VExhibitsInsert = z.object({
	exhibits: VExhibitsBaseInsert,
	td_youtubeVideos: z.optional(VETDYoutubeVideosInsert),
	td_youtubeChannels: z.optional(VETDYoutubeChannelsInsert),
});

export const VExhibitsUpdate = z.object({
	exhibits: z.optional(VExhibitsBaseUpdate),
	td_youtubeVideos: z.optional(VETDYoutubeVideosUpdate),
	td_youtubeChannels: z.optional(VETDYoutubeChannelsUpdate),
});

export const VExhibitsDelete = z.object({
	id: z.string().uuid().nonempty(),
});

export const VExhibitsIdTypeIdParam = z.object({
	id: z.string().uuid().nonempty(),
	exhibitTypeId: z.string().uuid().nonempty(),
});

export const VExhibitsSelectManyQuery = z
	.object({
		exhibitDateCreatedRangeStart: z.string().datetime().nonempty(),
		exhibitDateCreatedRangeEnd: z.string().datetime().nonempty(),
		nameLike: z.string().nonempty(),
		youtubeChannelHandle: z.string().nonempty(),
	})
	.partial()
	.superRefine((d, c) => {
		// Make sure there's a complete data range
		if (
			Boolean(d.exhibitDateCreatedRangeStart) !==
			Boolean(d.exhibitDateCreatedRangeEnd)
		) {
			c.addIssue({
				code: z.ZodIssueCode.custom,
				message:
					"If either exhibitDateCreatedRangeStart and exhibitDateCreatedRangeEnd are used, the other must exist.",
				path: ["dateRangeStart"],
			});
			c.addIssue({
				code: z.ZodIssueCode.custom,
				path: ["dateRangeEnd"],
			});
		}
	});
