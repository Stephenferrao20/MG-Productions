import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import PropTypes from 'prop-types';

function ReqCar({ request }) {
  return (
    <article className="rounded-xl bg-white p-4 m-4 ring ring-indigo-50 sm:p-6 lg:p-8">
      <div className="flex items-start sm:gap-8">
        <div
          className="hidden sm:grid sm:size-20 sm:shrink-0 sm:place-content-center sm:rounded-full sm:border-2 sm:border-indigo-500"
          aria-hidden="true"
        >
          <div className="flex items-center gap-1">
            <span className="h-8 w-0.5 rounded-full bg-indigo-500"></span>
            <span className="h-6 w-0.5 rounded-full bg-indigo-500"></span>
            <span className="h-4 w-0.5 rounded-full bg-indigo-500"></span>
            <span className="h-6 w-0.5 rounded-full bg-indigo-500"></span>
            <span className="h-8 w-0.5 rounded-full bg-indigo-500"></span>
          </div>
        </div>

        <div>
          <a
            href={request?.musicURL || ''}
            download
            className="rounded border border-indigo-500 bg-indigo-500 px-3 py-1.5 text-[10px] font-medium text-white"
          >
            Download
          </a>

          <h3 className="mt-4 text-lg font-medium sm:text-xl">
            <a href="#" className="hover:underline">
              {request?.name || 'Unknown Title'}
            </a>
          </h3>

          <p className="mt-1 text-sm text-gray-700">
            <AudioPlayer
              src={request?.musicURL || ''}
              onPlay={() => console.log('Playing music:', request?.name)}
              autoPlay={true}
              showSkipControls={false}
              showJumpControls={false}
            />
          </p>
        </div>
      </div>
    </article>
  );
}

ReqCar.propTypes = {
  request: PropTypes.shape({
    name: PropTypes.string,
    musicURL: PropTypes.string,
  }),
};

ReqCar.defaultProps = {
  request: {
    name: 'Unknown Title',
    musicURL: '',
  },
};

export default ReqCar;