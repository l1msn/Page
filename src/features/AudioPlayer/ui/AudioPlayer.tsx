import React, { JSX, useCallback, useEffect, useRef, useState } from 'react';
import classNames from '@/shared/lib/classNames/classNames';
import cls from './AudioPlayer.module.scss';
import { ICall } from '@/entities/Calls/model/types/ICallType';
import Motion from '@/shared/ui/Motion';
import { DatesUtils } from '@/shared/lib/dates/DatesUtils';
import Icon from '@/shared/ui/Icon';
import CancelIcon from '@/shared/assets/icons/close-icon.svg';
import PauseIcon from '@/shared/assets/icons/pause-icon.svg';
import PlayIcon from '@/shared/assets/icons/play-icon.svg';
import DownloadIcon from '@/shared/assets/icons/download-icon.svg';
import { HStack } from '@/shared/ui/Stack';
import { Card } from '@/shared/ui/Card';

interface IAudioPlayerProps {
    className?: string;
    call: ICall;
    id: number | null;
    setId: (id: number) => void;
    hovered: boolean;
}

const AudioPlayer: React.FC<IAudioPlayerProps> = (
    props: IAudioPlayerProps,
): JSX.Element => {
    const { setId, id, call, className, hovered } = props;
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [playStatus, setPlayStatus] = useState<boolean>(false);
    const [url, setUrl] = useState<string>('');
    const [duration, setDuration] = useState<number | string>(call.time);
    const [progress, setProgress] = useState<number>(0);
    const [added, setAdded] = useState<boolean>(false);

    useEffect(() => {
        if (call.id !== id && id !== null && playStatus) setPlayStatus(false);
    }, [id]);

    const fetchAudio = useCallback((record: string, partnership_id: string) => {
        fetch(
            `https://api.skilla.ru/mango/getRecord?record=${record}& partnership_id=${partnership_id}`,
            {
                method: 'POST',
                headers: {
                    authorization: 'Bearer testtoken',
                    'Content-type':
                        'audio/mpeg, audio/x-mpeg, audio/x-mpeg-3, audio/mpeg3',
                    'Content-Transfer-Encoding': 'binary',
                    'Content-Disposition': `filename="record.mp3"`,
                },
            },
        )
            .then((response) => {
                if (response.ok) {
                    return response.blob();
                } else {
                    setPlayStatus(false);
                    throw new Error('Bad response');
                }
            })
            .then((response) => {
                audioRef.current = new Audio(URL.createObjectURL(response));
                setUrl(URL.createObjectURL(response));
            })
            .catch((error) => console.log(error));
    }, []);

    useEffect(() => {
        if (!hovered && url && playStatus) setPlayStatus(false);
    }, [hovered]);

    useEffect(() => {
        if (playStatus) {
            if (id !== call.id) setId(call.id);
            if (!url) {
                fetchAudio(call.record, call.partnership_id);
            } else {
                audioRef.current?.play();
            }
        } else {
            if (url) audioRef.current?.pause();
        }
    }, [playStatus]);

    useEffect(() => {
        if (url) audioRef.current?.play();
    }, [url]);

    const handleAddClick = useCallback(() => {
        if (added) setAdded(false);
    }, [added]);

    const handleEndingAudio = useCallback(() => {
        setPlayStatus(false);
        if (audioRef.current) {
            const duration = audioRef.current.duration;
            setDuration(Math.round(duration));
        }
    }, []);

    const handleTimeUpdate = useCallback(() => {
        audioRef.current?.addEventListener('timeupdate', (e) => {
            const target = e.target as HTMLAudioElement;
            const duration = target.duration;
            const currentTime = target.currentTime;

            setDuration(duration - currentTime);
            setProgress((currentTime / duration) * 100);
        });
        audioRef.current?.addEventListener('ended', () => {
            handleEndingAudio();
            setProgress(0);
        });
    }, [handleEndingAudio]);

    const handleDuration = useCallback(() => {
        if (audioRef.current) {
            const currentTime = audioRef.current.currentTime;
            const duration = audioRef.current.duration;
            const diff = duration - currentTime;

            setDuration(DatesUtils.getMinutesFromSeconds(Math.round(diff)));
        }
    }, []);

    const handleNewProgress = useCallback(
        (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
            if (url) {
                const elem = document.getElementById(`bar${call.id}`);
                const elemWidth = elem?.getBoundingClientRect().width;
                let widthByClick;
                let newProgress;

                if (elem)
                    widthByClick =
                        e.clientX - elem?.getBoundingClientRect().left;
                if (widthByClick && elemWidth)
                    newProgress = (widthByClick / elemWidth) * 100;

                if (newProgress) setProgress(Math.round(newProgress));

                if (audioRef.current && newProgress) {
                    audioRef.current.currentTime = Math.round(
                        (newProgress / 100) * audioRef.current?.duration,
                    );
                }
            }
        },
        [call.id, url],
    );

    return (
        <div className={classNames(cls.audioPlayer, {}, [className])}>
            <Motion>
                <Card
                    max
                    className={cls.card}
                    border={'round'}
                    variant={'player'}
                >
                    <HStack max className={cls.audio} justify={'end'}>
                        <audio
                            ref={audioRef}
                            src={url}
                            preload="metadata"
                            onLoadedMetadata={handleDuration}
                            onTimeUpdate={handleTimeUpdate}
                            onEnded={handleEndingAudio}
                        ></audio>
                        <div className={cls.length}>
                            {typeof duration === 'string'
                                ? duration
                                : DatesUtils.getMinutesFromSeconds(
                                      Math.round(duration),
                                  ) === 0
                                ? '0:00'
                                : DatesUtils.getMinutesFromSeconds(
                                      Math.round(duration),
                                  )}
                        </div>
                        {playStatus ? (
                            <Icon
                                Svg={PauseIcon}
                                clickable
                                onClick={() => setPlayStatus(false)}
                            />
                        ) : (
                            <Icon
                                Svg={PlayIcon}
                                clickable
                                onClick={() => setPlayStatus(true)}
                            />
                        )}
                        <div
                            className={cls.bar}
                            onClick={(e) => handleNewProgress(e)}
                        >
                            <div className={cls.barBase}></div>
                            <div
                                className={cls.barTop}
                                style={{ width: `${progress}%` }}
                            ></div>
                        </div>
                        <Icon
                            Svg={DownloadIcon}
                            clickable
                            onClick={() => setAdded(true)}
                        />
                        {added && (
                            <Icon
                                Svg={CancelIcon}
                                clickable
                                onClick={handleAddClick}
                            />
                        )}
                    </HStack>
                </Card>
            </Motion>
        </div>
    );
};

export default AudioPlayer;
