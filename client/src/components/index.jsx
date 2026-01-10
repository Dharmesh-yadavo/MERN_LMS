import {
  MediaController,
  MediaControlBar,
  MediaTimeRange,
  MediaTimeDisplay,
  MediaVolumeRange,
  MediaPlaybackRateButton,
  MediaPlayButton,
  MediaSeekBackwardButton,
  MediaSeekForwardButton,
  MediaMuteButton,
  MediaFullscreenButton,
} from "media-chrome/react";

const VideoPlayer = ({ url, width, height }) => {
  return (
    <MediaController
      style={{
        width,
        height,
        aspectRatio: "16 / 9",
        backgroundColor: "black",
      }}
    >
      <video
        slot="media"
        src={url}
        preload="metadata"
        playsInline
        style={{ width: "100%", height: "100%" }}
      />

      <MediaControlBar className="gap-2 px-4 bg-transparent">
        <MediaPlayButton />
        <MediaTimeDisplay showDuration />
        <MediaSeekBackwardButton seekOffset={10} />
        <MediaSeekForwardButton seekOffset={10} />
        <MediaTimeRange />
        <MediaMuteButton />
        <MediaVolumeRange />
        <MediaPlaybackRateButton />
        <MediaFullscreenButton />
      </MediaControlBar>
    </MediaController>
  );
};

export default VideoPlayer;
