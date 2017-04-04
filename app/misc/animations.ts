import { AnimationTriggerMetadata, trigger, transition, style, animate } from "@angular/animations";

/**
 * Configuration that is used for InAnimations
 */
export interface InAnimationsConfig
{
    /**
     * Definition of timing for in animations, could be number in ms, or timing string
     */
    inTiming: string | number;
}

/**
 * Configuration that is used for OutAnimations
 */
export interface OutAnimationsConfig
{
    /**
     * Definition of timing for out animations, could be number in ms, or timing string
     */
    outTiming: string | number; 
}

/**
 * Configuration that is used for InOutAnimations
 */
export interface InOutAnimationsConfig extends InAnimationsConfig, OutAnimationsConfig
{
}

/**
 * Creates configured FlyInOutAnimation
 * @param {InOutAnimationsConfig} configuration Configuration object used for configuring animation
 * @returns AnimationEntryMetadata
 */
export function flyInOutAnimationConfig(configuration: InOutAnimationsConfig): AnimationTriggerMetadata
{
    return trigger('flyInOut',
    [
        transition('void => *', 
        [
            style(
            {
                opacity: 0,
                transform: 'translateX(-20%)'
            }),
            animate(configuration.inTiming, style(
            {
                opacity: 1,
                transform: 'translateX(0)'
            }))
        ]),
        transition('* => void', 
        [
            animate(configuration.outTiming, style(
            {
                opacity: 0,
                transform: 'translateX(20%)'
            }))
        ])
    ]);
};

/**
 * Default FlyInOutAnimation
 */
export const FlyInOutAnimation = flyInOutAnimationConfig(
{
    inTiming: '400ms ease-in',
    outTiming: '400ms ease-out'
});
