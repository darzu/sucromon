namespace SpriteKind {
    export const Sucromon = SpriteKind.create()
    export const Background = SpriteKind.create()
    export const SucromonChoice = SpriteKind.create()
    export const Cursor = SpriteKind.create()
    export const SwitcherLabel = SpriteKind.create()
    export const SwitcherCursor = SpriteKind.create()
    export const SucroOrb = SpriteKind.create()
    export const BattleMenuText = SpriteKind.create()
}
namespace StatusBarKind {
    export const XP = StatusBarKind.create()
}
/**
 * Extensions we are using:
 * 
 *   1. darzu/arcade-text
 * 
 *   2. jwunderl/pxt-status-bars
 * 
 *   3. riknoll/arcade-story
 * 
 *   4. arcade-sprite-data
 */
/**
 * Battle Options:
 * 
 *    1. FIGHT
 * 
 *    2. CATCH
 * 
 *    3. RUN AWAY
 * 
 *    4. SWITCH
 */
/**
 * Sucromon = Sucrose (sugar) + Monster
 * 
 * Sucromon Properties:
 * 
 *   1. Portrait (32x32 image)
 * 
 *   2. Name (max 8 characters)
 * 
 *   3. Health
 */
/**
 * 160 - (32 * 2) +
 */
/**
 * TODO:
 * 
 * - Lose battle code (switch to next health Sucromon)
 * 
 * - Win battle
 * 
 * - Gaining experience: defeating enemies, catching?
 * 
 * BUGS:
 * 
 * - Multiple "A" buttons queued
 * 
 * - Sucromon drift as battle goes on
 */
function moveBattleMenuSelection (direction: number) {
    if (scene2 != "battle mode") {
        return
    }
    if (direction == 0) {
        if (selectedMenuItem == switchMenuItem) {
            selectedMenuItem = fightMenuItem
        } else if (selectedMenuItem == runMenuItem) {
            selectedMenuItem = catchMenuItem
        }
    } else if (direction == 1) {
        if (selectedMenuItem == fightMenuItem) {
            selectedMenuItem = catchMenuItem
        } else if (selectedMenuItem == switchMenuItem) {
            selectedMenuItem = runMenuItem
        }
    } else if (direction == 2) {
        if (selectedMenuItem == fightMenuItem) {
            selectedMenuItem = switchMenuItem
        } else if (selectedMenuItem == catchMenuItem) {
            selectedMenuItem = runMenuItem
        }
    } else {
        if (selectedMenuItem == catchMenuItem) {
            selectedMenuItem = fightMenuItem
        } else if (selectedMenuItem == runMenuItem) {
            selectedMenuItem = switchMenuItem
        }
    }
    cursor.right = selectedMenuItem.left
    cursor.y = selectedMenuItem.y
}
function healTeam () {
    story.queueStoryPart(function () {
        story.printDialog("WE REST AT HOME", 80, 90, 50, 150, 15, 1)
    })
    story.queueStoryPart(function () {
        for (let value of sucromonTeam) {
            statusbars.getStatusBarAttachedTo(StatusBarKind.Health, value).value += 99999
        }
    })
}
function show_switcher_menu () {
    changeScene("sucromon switcher")
    background_cover = sprites.create(img`
        f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
        f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
        f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
        f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
        f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
        f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
        f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
        f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
        f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
        f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
        f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
        f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
        f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
        f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
        f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
        f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
        f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
        f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
        f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
        f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
        f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
        f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
        f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
        f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
        f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
        f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
        f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
        f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
        f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
        f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
        f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
        f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
        f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
        f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
        f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
        f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
        f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
        f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
        f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
        f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
        f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
        f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
        f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
        f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
        f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
        f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
        f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
        f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
        f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
        f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
        f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
        f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
        f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
        f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
        f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
        f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
        f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
        f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
        f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
        f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
        f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
        f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
        f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
        f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
        f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
        f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
        f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
        f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
        f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
        f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
        f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
        f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
        f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
        f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
        f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
        f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
        f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
        f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
        f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
        f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
        f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
        f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
        f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
        f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
        f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
        f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
        f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
        f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
        f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
        f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
        f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
        f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
        f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
        f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
        f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
        f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
        f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
        f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
        f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
        f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
        f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
        f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
        f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
        f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
        f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
        f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
        f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
        f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
        f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
        f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
        f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
        f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
        f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
        f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
        f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
        f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
        f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
        f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
        f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
        f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
        `, SpriteKind.Background)
    header_text_sprite = textsprite.create("CHOOSE YOUR SUCROMON!", 1, 15)
    header_text_sprite.setBorder(0, 0, 2)
    header_text_sprite.setKind(SpriteKind.SwitcherLabel)
    header_text_sprite.setMaxFontHeight(8)
    header_text_sprite.setPosition(76, 13)
    for (let index = 0; index <= sucromonTeam.length - 1; index++) {
        sucromon_member = sucromonTeam[index]
        sucromon_choice = sprites.create(sucromon_member.image, SpriteKind.SucromonChoice)
        sprites.setDataSprite(sucromon_choice, "sucromon", sucromon_member)
        col = index % 3
        row = Math.idiv(index, 3)
        sucromon_choice.x = col * 48 + 24
        sucromon_choice.y = row * 48 + 48
    }
    switcher_health = statusbars.create(100, 8, StatusBarKind.Health)
    switcher_health.setLabel("HP")
    switcher_health.setStatusBarFlag(StatusBarFlag.SmoothTransition, false)
    switcher_health.setPosition(73, 104)
    switcher_xp = statusbars.create(100, 8, StatusBarKind.Health)
    switcher_xp.setColor(8, 9)
    switcher_xp.setLabel("XP")
    switcher_xp.setStatusBarFlag(StatusBarFlag.SmoothTransition, false)
    switcher_xp.setPosition(73, 112)
    sucromon_label = textsprite.create("", 1, 15)
    sucromon_label.setKind(SpriteKind.SwitcherLabel)
    sucromon_label.setBorder(0, 0, 2)
    sucromon_label.setMaxFontHeight(8)
    sucromon_label.setPosition(71, 84)
    switcher_cursor = sprites.create(img`
        . . . . . . b b b b a a . . . . 
        . . . . b b d d d 3 3 3 a a . . 
        . . . b d d d 3 3 3 3 3 3 a a . 
        . . b d d 3 3 3 3 3 3 3 3 3 a . 
        . b 3 d 3 3 3 3 3 b 3 3 3 3 a b 
        . b 3 3 3 3 3 a a 3 3 3 3 3 a b 
        b 3 3 3 3 3 a a 3 3 3 3 d a 4 b 
        b 3 3 3 3 b a 3 3 3 3 3 d a 4 b 
        b 3 3 3 3 3 3 3 3 3 3 d a 4 4 e 
        a 3 3 3 3 3 3 3 3 3 d a 4 4 4 e 
        a 3 3 3 3 3 3 3 d d a 4 4 4 e . 
        a a 3 3 3 d d d a a 4 4 4 e e . 
        . e a a a a a a 4 4 4 4 e e . . 
        . . e e b b 4 4 4 4 b e e . . . 
        . . . e e e e e e e e . . . . . 
        . . . . . . . . . . . . . . . . 
        `, SpriteKind.SwitcherCursor)
    controller.moveSprite(switcher_cursor)
}
controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    moveBattleMenuSelection(0)
    if (scene2 == "overworld") {
        spriteWalk(overworldPlayer, 0)
    }
})
function destroyAllKind (kind: number) {
    for (let value of sprites.allOfKind(kind)) {
        value.destroy()
    }
}
function changeScene (newSceneName: string) {
    lastScene = scene2
    // The scene we're destroying
    if (scene2 == "sucromon switcher") {
        background_cover.destroy()
        // Work around for inference bug
        switcher_health.value = 0
        switcher_health.destroy()
        switcher_xp.value = 0
        switcher_xp.destroy()
        destroyAllKind(SpriteKind.SucromonChoice)
        destroyAllKind(SpriteKind.SwitcherLabel)
        destroyAllKind(SpriteKind.SwitcherCursor)
    } else if (scene2 == "catch attempt") {
        background_cover.destroy()
        sucrOrb.destroy()
        showOrHideSucromon(otherSucromon, true)
        showOrHideSucromon(currentSucromon, true)
    } else if (scene2 == "overworld") {
        tiles.setTilemap(tiles.createTilemap(hex`1000100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000`, img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `, [myTiles.transparency16], TileScale.Sixteen))
        scene.cameraFollowSprite(cameraAnchor)
        overworldPlayer.setFlag(SpriteFlag.Invisible, true)
    } else if (scene2 == "battle mode") {
        for (let value of sprites.allOfKind(SpriteKind.Sucromon)) {
            showOrHideSucromon(value, true)
        }
        cursor.destroy()
        tiles.destroySpritesOfKind(SpriteKind.BattleMenuText)
    }
    scene2 = newSceneName
}
function battleCatch () {
    changeScene("catch attempt")
    showOrHideSucromon(currentSucromon, false)
    showOrHideSucromon(otherSucromon, false)
    background_cover = sprites.create(img`
        f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
        f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
        f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
        f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
        f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
        f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
        f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
        f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
        f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
        f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
        f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
        f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
        f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
        f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
        f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
        f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
        f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
        f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
        f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
        f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
        f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
        f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
        f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
        f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
        f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
        f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
        f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
        f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
        f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
        f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
        f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
        f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
        f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
        f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
        f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
        f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
        f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
        f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
        f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
        f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
        f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
        f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
        f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
        f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
        f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
        f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
        f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
        f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
        f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
        f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
        f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
        f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
        f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
        f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
        f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
        f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
        f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
        f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
        f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
        f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
        . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
        `, SpriteKind.Player)
    background_cover.bottom = 120
    story.queueStoryPart(function () {
        sucrOrb = sprites.create(img`
            . . . . 5 5 5 5 5 5 5 . . . . 
            . . 5 5 5 5 5 5 5 d 5 5 5 . . 
            . 5 5 1 d 5 5 5 5 5 5 5 5 5 . 
            . 5 1 5 5 5 5 d 5 5 5 5 5 5 . 
            5 5 5 5 5 5 5 5 5 5 5 5 d 5 5 
            5 5 5 d 5 5 5 5 5 5 5 5 5 5 5 
            5 5 5 5 5 5 5 5 d 5 5 5 5 5 5 
            5 5 5 5 5 5 d 5 5 5 5 5 5 5 d 
            5 5 d 5 5 5 5 5 5 5 d 5 5 5 5 
            5 5 5 5 5 5 d 5 5 5 5 5 5 5 5 
            5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 
            . 5 5 5 5 5 5 5 5 5 5 5 5 5 . 
            . e f e f e f e f e f e f e . 
            . . f e f e f e f e f e f . . 
            . . . . f e f e f e f . . . . 
            . . . . . . . . . . . . . . . 
            `, SpriteKind.SucroOrb)
        sucrOrb.right = 0
        sucrOrb.follow(otherSucromon)
        sucrOrb.z = 100
        pause(1000)
    })
    story.queueStoryPart(function () {
        otherSucromon.setFlag(SpriteFlag.Invisible, true)
        pause(1000)
        CatchSuccessful = canCatchSucromon()
    })
    story.queueStoryPart(function () {
        // If we can catch it:
        //  -  Show congratulatory text
        //  - add it to the team
        //  - Go back to overworld
        // 
        // If we CAN'T:
        //  -  Show sad, encouraging text ✅
        //  -  Let the enemy take its turn
        //  -  Switch Scenes
        if (CatchSuccessful) {
            effects.confetti.startScreenEffect(500)
            story.printDialog("GOT IT!", 80, 90, 50, 150, 15, 1)
            addSucromonToTeam(otherSucromon)
            story.queueStoryPart(function () {
                openOverworld()
            })
        } else {
            sucrOrb.destroy()
            otherSucromon.setFlag(SpriteFlag.Invisible, false)
            story.queueStoryPart(function () {
                story.printDialog("OH NO IT DIDN'T WORK!", 80, 90, 50, 150, 15, 1)
            })
            story.queueStoryPart(function () {
                changeScene("battle mode")
                createBattleMenu()
                showOrHideSucromon(otherSucromon, false)
                showOrHideSucromon(currentSucromon, false)
            })
            wildSucromonMove()
        }
    })
}
function getSucromon (name: string) {
    if (name == "DONUTSO") {
        return createSucromon(img`
            . . . . . . . . . . . . . . b b b b b b b . . . . . . . . . . . 
            . . . . . . . . . . . b b 6 6 6 6 3 3 3 3 b a a . . . . . . . . 
            . . . . . . . . . b b 3 3 6 7 7 7 6 3 3 3 6 6 3 a a . . . . . . 
            . . . . . . . . b 3 3 3 3 3 8 8 8 3 3 3 3 8 9 6 3 3 a a . . . . 
            . . . . . . . b 3 3 3 3 3 3 3 3 3 3 3 3 3 3 8 9 6 3 3 a a . . . 
            . . . . . . b 3 4 4 4 3 3 3 3 3 3 3 3 3 3 3 3 8 6 3 3 b a e . . 
            . . . . . b 3 4 5 5 4 3 3 3 3 3 3 3 3 3 3 4 4 4 3 3 3 3 a e . . 
            . . . . b 3 3 3 2 2 3 3 3 d d d d 3 3 3 3 4 5 5 2 3 3 d a e e . 
            . . . b 3 d 3 3 3 3 3 3 d d 3 b b b b 3 3 3 2 2 3 3 3 d a b e . 
            . . b 3 d 3 3 3 3 3 3 d 3 b b 3 3 b b 3 3 3 3 3 3 3 3 d a 4 e . 
            . . b d 3 3 3 3 3 3 3 3 b 3 3 a a b 3 3 3 3 3 3 3 2 2 3 a 4 e e 
            . b 3 d 3 6 6 3 3 3 3 b 3 3 a a b 3 3 3 6 6 3 3 2 4 4 2 b 4 e e 
            . b d 3 b 9 8 3 3 3 3 a 3 a a 3 3 3 3 3 8 7 6 3 3 e e 3 b 4 e e 
            . b d 6 9 8 3 3 3 3 b a a a 3 3 3 3 3 3 3 8 7 6 3 3 b b 4 b e e 
            b 3 d 6 8 3 3 3 3 3 b b a 3 3 3 3 3 3 3 3 3 8 6 3 b a 4 4 e b e 
            b d d 3 3 3 3 3 3 3 b b 3 3 3 3 3 3 3 3 3 3 3 3 3 a 4 4 b e b e 
            a d d 6 6 6 6 3 3 3 3 3 3 2 2 3 3 3 3 6 6 3 3 3 b a 4 4 b b b e 
            a d 6 7 7 7 6 3 3 3 3 3 2 4 4 2 3 3 6 9 8 3 d 3 a 4 4 4 b 4 e . 
            a d d 8 8 8 b 3 3 3 3 3 3 e e 3 3 6 9 8 3 3 d 3 a 4 4 b 4 4 e . 
            a d d 3 3 3 3 3 3 3 3 3 3 3 3 3 3 6 8 3 3 d 3 a 4 4 4 b 4 e . . 
            a 3 d d 3 3 3 3 3 4 4 4 3 3 3 3 3 d d d d 3 a 4 4 4 b 4 4 e . . 
            a b 3 3 d d d 3 2 5 5 4 3 3 3 3 d d 3 3 a a 4 4 4 b 4 4 e . . . 
            . e a b b 3 d d 3 2 2 3 3 3 3 3 b a a a 4 4 4 4 b 4 4 e . . . . 
            . e b a b b 3 d 3 3 3 d 3 3 b a a 4 4 4 4 4 3 b 4 4 e . . . . . 
            . . e b a a b 3 d d d 3 a a a 4 4 4 4 4 3 3 b 4 4 e . . . . . . 
            . . e e b b a a b 3 3 a 4 4 4 4 4 3 3 3 b 4 4 4 e . . . . . . . 
            . . . e e e b b a a b 4 4 4 b 3 3 3 b 4 4 4 4 e . . . . . . . . 
            . . . . e b e e e b b b b b b b b 4 4 4 4 e e . . . . . . . . . 
            . . . . . e e b b b b 4 4 4 4 4 4 4 4 e e . . . . . . . . . . . 
            . . . . . . . e e e b b b 4 4 4 e e e . . . . . . . . . . . . . 
            . . . . . . . . . . e e e e e e . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
            `, "DONUTSO", 15, 4)
    } else if (name == "CONEY") {
        return createSucromon(img`
            . . . . . . . . . . . . 3 3 3 3 b b . . b b 3 3 3 3 3 . . . . . 
            . . . . . . . . 3 b b 3 1 1 1 1 d 3 b 3 1 1 d 1 1 1 d 3 3 . . . 
            . . . . . . . 3 b d d 1 1 1 1 1 d b d 1 1 d 1 1 1 1 1 1 1 3 . . 
            . . . . . . . b d d d d 1 1 1 1 b d 1 1 d 1 1 1 d d 1 1 1 1 3 . 
            . . . . . . 3 d 1 1 1 d d 1 1 1 b 1 1 d 1 1 1 d d 3 3 d 1 1 d 3 
            . . . . . . 3 d 1 1 1 1 1 d d 1 d 1 1 d 1 1 1 d 1 1 d 3 3 1 1 3 
            . . . . b b 3 d 1 1 1 1 1 1 d d 1 3 d d 1 1 1 d 1 d d 3 b 3 1 b 
            . . . b 3 d 3 d d 1 1 1 1 1 1 d d 1 3 d d 1 1 d 1 d d d b b d b 
            . . . 3 d d d 3 1 d 1 1 1 1 1 1 d d 1 3 3 d d d d d d d b . b . 
            . . 3 1 1 1 1 1 d 1 d d d 1 1 1 1 d d 1 1 d d d d d d 3 3 . . . 
            . . 3 1 1 1 1 1 1 d 1 1 1 d d 1 1 1 d d 1 1 1 1 d d 3 3 1 3 . . 
            . . b d d d 1 1 1 1 d d d 1 1 d d 1 1 1 d 1 1 1 1 1 1 1 1 3 . . 
            . . 3 1 1 d d d 1 1 1 d d d d 1 1 d d 1 1 d d d 1 1 1 1 d d b . 
            . . 3 1 1 1 1 d d 1 1 1 d d d d 1 1 d d 1 1 1 d d d d d d d b . 
            . . . b d 1 1 1 1 d 1 1 1 3 d d d 1 1 d d 1 1 1 1 1 1 1 d 3 b . 
            . . . 4 d d 1 1 1 1 d 1 1 1 3 d d d 1 1 d d d 1 1 1 d 3 3 3 b . 
            . . 4 d b d d d d 1 1 d 1 1 1 3 3 d d d d d d d d d d d d b . . 
            . 4 d d b d d d d d 1 1 d 1 1 1 d 3 3 d d d d d d d d d 3 b . . 
            . 4 d d d b 1 1 d d d 1 1 d d 1 1 1 d 3 3 3 d d d d 3 b b . . . 
            . 4 d d 5 5 b 1 1 1 d 1 1 d d 1 1 1 1 1 d 3 3 3 3 b b b . . . . 
            . 4 4 5 5 5 5 b 1 1 1 d 1 1 d d d d 1 1 1 1 1 1 d d b . . . . . 
            . 4 4 5 5 5 5 5 b d 1 d 3 1 1 d d d d d d d d d d d 3 . . . . . 
            . 4 5 4 5 5 5 5 5 b b 1 d 3 1 1 1 d d d d d d d 1 1 3 . . . . . 
            . 4 5 5 4 5 5 5 5 5 5 b 3 3 3 d 1 1 1 1 1 1 1 1 1 3 . . . . . . 
            4 5 5 5 5 4 5 5 5 5 5 5 b b b 3 3 d 1 1 1 1 1 d 3 3 . . . . . . 
            4 d 5 5 5 5 4 5 5 5 5 5 5 5 d b b b 3 d 1 1 d 3 3 . . . . . . . 
            4 d d 5 5 5 5 4 5 5 5 5 5 d d d d d 4 3 3 3 3 . . . . . . . . . 
            4 5 d d 5 5 5 5 4 4 d d d d d d d 4 . . . . . . . . . . . . . . 
            . 4 5 d d 5 5 5 5 d 4 4 d d d d 4 . . . . . . . . . . . . . . . 
            . . 4 5 d d 5 5 d d d d 4 4 4 4 . . . . . . . . . . . . . . . . 
            . . . 4 5 d d 5 5 4 4 4 . . . . . . . . . . . . . . . . . . . . 
            . . . . 4 4 4 4 4 . . . . . . . . . . . . . . . . . . . . . . . 
            `, "CONEY", 20, 5)
    } else if (name == "CAKER") {
        return createSucromon(img`
            . . . . . . . . . . . . . . . . . . . . . . b b b . . . . . . . 
            . . . . . . . . . . . . . . . . . . . . b b 3 3 3 b . . . . . . 
            . . . . . . . . . . . . . . . . . b b b 3 3 3 d 3 3 b . . . . . 
            . . . . . . . . . . . . . . . . b b 3 3 3 3 3 3 d 3 a . . . . . 
            . . . . . . . . . . . . . . b b 3 3 3 3 2 e e e e d b a . . . . 
            . . . . . . . . . . . . b b b 3 3 3 3 2 3 e e e 2 e 3 a . . . . 
            . . . . . . . . . . b b d 3 3 3 3 3 3 e 2 2 2 2 2 e d 3 a . . . 
            . . . . . . . b b b d d 3 3 3 3 3 3 3 e 2 2 2 2 2 e d d a . . . 
            . . . . . . b b 3 d 3 3 3 3 3 3 3 3 3 b e 2 2 2 e b 3 d 3 a . . 
            . . . b b b 3 d d 3 3 3 3 3 3 3 3 3 3 3 b e e e b 3 3 d 3 a . . 
            . . b 3 d d d 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 d d a . . 
            b b d d d 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 d d 3 a . 
            b 3 3 d d d d d d 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 d 3 a . 
            b b 3 3 3 3 3 3 3 d d d d d 3 3 3 3 3 3 3 3 3 3 3 3 3 3 d d a . 
            b b b b b b b 3 3 3 d d 3 3 d d d d d d d d d d 3 3 3 3 d d b a 
            b 5 5 5 5 3 b b b b b b 3 3 3 3 d d 3 3 3 3 3 d d d 3 3 d d 3 a 
            b 5 5 5 5 5 5 5 5 5 5 5 3 b b b b b b b b 3 3 3 3 3 d d d d 3 a 
            b d 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 d d d b a a a a a b 3 d 3 b a 
            b b 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 d d d d d d d b b 3 3 b a 
            b 3 b b 3 5 5 5 5 5 5 5 5 5 5 d 5 5 5 5 d 5 5 d d d d d b b b a 
            b 3 3 3 3 3 b b b 3 5 5 d d 5 5 5 5 5 d 5 5 5 d d d d d d b b a 
            b 5 5 5 5 d 3 3 3 3 3 3 b b b 3 5 d d d d d d 5 5 d d d d b b a 
            b 5 d 5 5 5 d d 5 5 5 3 3 3 3 b b b b b 3 d d d d d d d d b 3 a 
            b 5 d 5 5 5 5 5 5 5 5 5 5 5 5 d d 3 3 3 3 b b b b b b 3 d b 3 a 
            b d 5 d 5 5 5 5 5 5 d 5 5 5 5 5 d d 5 5 5 d d b b b b b b b 3 a 
            b b b 5 5 d d 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 d d d d d d b b 3 a 
            . . . b b b b d d 5 5 5 d d d 5 5 5 5 d d d d d d d d d d b 3 a 
            . . . . . . . b b b b 5 5 5 5 5 5 d 5 d d d 5 d d d d d d b 3 a 
            . . . . . . . . . . . b b b b 5 5 5 5 5 5 5 5 5 5 5 d d 5 3 3 a 
            . . . . . . . . . . . . . . . b b b b d d d 5 d 5 5 d 5 b 3 b a 
            . . . . . . . . . . . . . . . . . . . b b b b d d d d b 3 b a . 
            . . . . . . . . . . . . . . . . . . . . . . . b b b a a a a . . 
            `, "CAKER", 18, 3)
    } else if (name == "HONEBADG") {
        return createSucromon(img`
            . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . . . . . . . . . . . . 1 5 1 . . 
            . . . . . . 1 5 1 . . . . . . 1 5 1 . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . . . . . . . . 1 5 1 . . . . . . 
            . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
            . . . . . . . . 1 5 1 . . . . . . . . . . . . . . . . . . . . . 
            . . . 1 5 1 . . . . . . . . . 1 5 1 . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
            . . . . . 1 5 1 . . . . . . . . . . . . . 5 5 5 d d d d . . . . 
            . . . . . . . . . . . . 1 5 1 . . . . . . 5 5 5 5 d d d d d . . 
            . 5 . . . . . . . . . . . . . . . . . . . . 5 5 5 5 5 5 5 5 . . 
            5 5 5 . . . . . . 1 5 1 . . . . . . . . . e d 5 5 f 5 5 5 f 5 . 
            . 5 5 5 . . d d . . . . . . . . . . . . d d d 5 5 5 5 5 5 5 5 . 
            . . 5 5 5 d d d e d d d d e d d d d d e d 5 5 5 5 5 5 5 f 5 f . 
            . . . 5 5 5 5 d d d e d d d d d e d d d d d 5 5 5 5 5 5 5 5 5 . 
            . . . . 5 5 5 5 5 5 d d e d e d d d 5 5 5 5 5 5 5 5 5 5 4 4 f . 
            . . . . 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 4 4 f . 
            . . . . 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 . . 
            . . . . 5 5 5 5 e 5 5 5 5 5 5 5 5 5 5 e 5 5 5 5 5 5 . . . . . . 
            . . . . 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 . . . . 5 . . 
            . . . . 5 5 5 5 5 5 5 5 5 e 5 5 5 5 5 5 5 5 5 5 4 . . . 5 . 5 . 
            . . . 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 4 4 4 . . . . . . 
            . . . 5 5 5 5 4 4 4 5 5 5 . . . . . 5 5 5 5 5 4 4 4 4 . . . . . 
            . . 5 5 5 5 5 4 4 4 4 . . . . . . . . . 5 5 5 . 4 4 4 4 . . . . 
            . . 5 5 5 5 5 4 4 4 4 4 . . . . 5 . . . 5 5 5 . . 4 4 4 4 . . 5 
            . . . 5 5 5 5 . . 4 4 4 4 . . . 5 . 5 . . 5 5 5 . . 4 4 4 . 5 . 
            . . . . 5 5 5 5 . . 4 4 4 . . . . . 5 . . 5 5 5 . . . 4 4 4 . . 
            . . . . 5 5 5 5 . . . 4 4 4 . . . 5 . . . . 5 5 5 . . 4 4 4 . 5 
            . . . . 5 f 5 f . . . . 4 f . . . 5 . . . . 5 f 5 f . . 4 f . . 
            `, "HONEBADG", 25, 8)
    } else if (name == "ROLYPOL") {
        return createSucromon(img`
            . . . . . . f f f f f f f . . . . . . . . . . . . . . . . . . . 
            . . . . f f 2 2 2 2 2 2 2 f f . . . . . . . . . . . . . . . . . 
            . . . f 2 2 2 2 2 2 2 1 2 2 2 f . . . . . . . . . . . . . . . . 
            . . . f 2 2 2 2 2 2 2 2 1 2 2 f . . . . . . . . . . . . . . . . 
            . . f 2 2 2 2 2 2 2 2 2 2 1 2 2 f . . . . . . . . . . . . . . . 
            . . f 2 2 2 2 2 2 2 2 2 2 2 2 2 f . . . . . . . . . . . . . . . 
            . . f 2 2 2 2 2 2 2 2 2 2 2 2 2 f . . . . . . . . . . . . . . . 
            . . f 2 2 2 2 2 2 2 2 2 2 2 2 2 f . . . . . . . . . . . . . . . 
            . . f 2 2 f 2 2 2 2 2 2 2 f 2 2 f . . . . . . . . . . . . . . . 
            . . f 2 2 2 2 2 2 2 2 2 2 2 2 2 f . . . . . . . . . . . . . . . 
            . . f 2 2 2 2 f 2 2 f 2 2 2 e e f . . . . . . . . . . . . . . . 
            . . . f 2 2 2 2 f f 2 2 2 e e f . . . . . . . . . . . . . . . . 
            . . . f 2 2 2 2 2 2 2 e e e f f . . . . . . . . . . . . . . . . 
            . . . . f f 2 2 2 2 e e e f f f . . . . . . . . . . . . . . . . 
            . . . . . . f f f f f f f . . f f . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . f . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . f f . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . . f f . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . . . f f . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . . . . f f . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . . . . . f f . . . . . . . . . . 
            . . . . . . . . . . . . . . . . . . . . . f f . . . . . . . . . 
            . . . . . . . . . . . . . . . . . . . . . f f . . . . . . . . . 
            . . . . . . . . . . . . . . . . . . . . . . f f . . . . . . . . 
            . . . . . . . . . . . . . . . . . . . . . . . f f . . . . . . . 
            . . . . . . . . . . . . . . . . . . . . . . . . f f . . . . . . 
            . . . . . . . . . . . . . . . . . . . . . . . . . f f . . . . . 
            . . . . . . . . . . . . . . . . . . . . . . . . . . f f . . . . 
            . . . . . . . . . . . . . . . . . . . . . . . . . . . f f . . . 
            . . . . . . . . . . . . . . . . . . . . . . . . . . . f f . . . 
            . . . . . . . . . . . . . . . . . . . . . . . . . . . . f f . . 
            . . . . . . . . . . . . . . . . . . . . . . . . . . . . . f f . 
            `, "ROLYPOL", 22, 6)
    } else if (name == "GRIFLIME") {
        return createSucromon(img`
            . . . . . . . . . . . . 3 3 3 3 . . . . . . . . . . . . . . . . 
            . . . . . . . . . . 3 3 3 d d d 3 3 . . . . . . . . . . . . . . 
            . . . . . . . . 6 6 6 3 d 1 1 1 1 3 3 . . 3 . . d . . . . . . . 
            . . . . . . 6 6 5 5 5 3 1 1 1 1 1 1 3 3 3 3 3 . . . . . . . . . 
            . . . . . 6 5 5 7 7 5 6 1 1 1 3 d 1 1 1 1 3 3 . . . . . . . . . 
            . . . . 6 5 7 7 f d 7 6 1 1 1 d 3 d d 1 3 3 . . . . . . . . . . 
            . . . 7 5 6 7 7 f 1 7 6 1 1 1 1 d 3 3 3 3 . . . . . . . . . . . 
            . . 7 5 5 5 c 7 7 7 7 7 3 1 1 1 d d 3 . . . . . . . . . . . . . 
            . 7 5 5 5 5 c 7 7 7 7 7 6 1 1 1 1 d 3 . . . . . . . . . . . . . 
            . 6 6 6 c c c 7 7 7 7 7 c 6 3 1 1 d . . . . . . . . . . . . . . 
            . . . . . c c 7 7 7 7 7 7 c 6 3 3 3 . . . . . . . . . . . . . . 
            . . . . . . 6 7 7 7 7 7 7 7 c c c c c c c . . . . . . . . . c 6 
            . . . . . . 6 7 7 7 7 7 7 7 7 7 c 6 6 6 6 c c c . . . c c 6 7 6 
            . . . . . . 6 7 7 7 7 7 7 7 7 7 7 c c c 6 6 6 6 c c c 7 7 7 7 6 
            . . . . . . 6 7 7 7 c 5 7 7 7 7 7 7 c c c c c c c c 7 7 7 7 6 . 
            . . . . . 6 5 7 7 c 1 5 7 7 7 7 6 c 7 7 7 7 c c 7 7 7 7 7 7 6 . 
            . . . . . 6 5 7 7 c 5 7 7 7 6 c 7 7 7 7 c c 7 7 7 7 7 7 6 6 . . 
            . . . . . c 7 7 7 c 5 7 7 7 7 7 7 7 6 c 7 7 5 5 7 7 6 6 . . . . 
            . . . . . c 7 7 c 1 1 5 7 7 7 7 6 c c 7 5 5 7 7 6 6 c c c . . . 
            . . . . . c 7 7 c c 1 5 7 7 7 7 5 5 5 7 7 7 c c c c 7 c c . . . 
            . . . . . c 7 7 7 c 1 1 5 5 5 5 1 7 7 c c c 6 6 6 7 7 c . . . . 
            . . . . c 6 7 7 7 6 c c 1 1 1 c c c c 6 6 6 6 6 7 7 7 c c . . . 
            . . . . c 6 c 7 7 7 6 6 c c c 6 6 6 6 6 6 6 7 7 7 7 7 c c . . . 
            . . . c 6 6 c 7 7 7 7 6 6 6 6 6 6 6 6 7 7 7 7 7 7 7 7 7 c . . . 
            . . . c c 6 c c 7 7 7 7 7 6 6 6 6 7 7 7 7 7 7 7 7 7 7 7 7 c . . 
            . . . c c c c 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 c c c 7 5 7 7 c . 
            . . . c c c 7 5 7 7 7 7 7 7 7 7 7 7 7 7 c c c c 6 c c 7 5 7 c . 
            . . . . c 7 5 7 7 7 6 c c c c c c c c c . . c c c 6 c 6 7 5 6 . 
            . . . . 6 5 7 7 7 6 c . . . . . . . . . . . . c c c . . 6 7 6 . 
            . . . . 6 5 7 7 7 c . . . . . . . . . . . . . . c c . . . 6 7 . 
            . . . . 6 5 7 c c . . . . . . . . . . . . . . . . . . . . . . . 
            . . . . 7 6 6 . . . . . . . . . . . . . . . . . . . . . . . . . 
            `, "GRIFLIME", 70, 3)
    } else {
        return createSucromon(img`
            . . . . . . . . . . . . . . b b b b b b b . . . . . . . . . . . 
            . . . . . . . . . . . b b 3 3 3 3 3 3 3 3 b a a . . . . . . . . 
            . . . . . . . . . b b 3 3 3 3 3 3 6 3 3 3 6 6 3 a a . . . . . . 
            . . . . . . . . b 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 a a . . . . 
            . . . . . . . b 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 a a . . . 
            . . . . . . b 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 b a e . . 
            . . . . . b 3 4 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 a e . . 
            . . . . b 3 3 3 3 3 3 3 3 d d d d 3 3 3 3 3 3 3 3 3 3 d a e e . 
            . . . b 3 d 3 3 3 3 3 3 d d 3 b b b b 3 3 3 3 3 3 3 3 d a b e . 
            . . b 3 d 3 3 3 3 3 3 d 3 b b 3 3 b b 3 3 3 3 3 3 3 3 d a 4 e . 
            . . b d 3 3 3 3 3 3 3 3 b 3 3 a a b 3 3 3 3 3 3 3 3 3 3 a 4 e e 
            . b 3 d 3 3 3 3 3 3 3 b 3 3 a a b 3 3 3 3 3 3 3 3 3 3 2 b 4 e e 
            . b d 3 3 3 3 3 3 3 3 a 3 a a 3 3 3 3 3 3 3 3 3 3 3 e 3 b 4 e e 
            . b d 3 3 3 3 3 3 3 b a a a 3 3 3 3 3 3 3 3 3 3 3 3 b b 4 b e e 
            b 3 d 3 3 3 3 3 3 3 b b a 3 3 3 3 3 3 3 3 3 3 3 3 b a 4 4 e b e 
            b d d 3 3 3 3 3 3 3 b b 3 3 3 3 3 3 3 3 3 3 3 3 3 a 4 4 b e b e 
            a d d 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 b a 4 4 b b b e 
            a d 6 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 d 3 a 4 4 4 b 4 e . 
            a d d 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 d 3 a 4 4 b 4 4 e . 
            a d d 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 d 3 a 4 4 4 b 4 e . . 
            a 3 d d 3 3 3 3 3 3 3 3 3 3 3 3 3 d d d d 3 a 4 4 4 b 4 4 e . . 
            a b 3 3 d d d 3 2 3 3 3 3 3 3 3 d d 3 3 a a 4 4 4 b 4 4 e . . . 
            . e a b b 3 d d 3 3 3 3 3 3 3 3 b a a a 4 4 4 4 b 4 4 e . . . . 
            . e b a b b 3 d 3 3 3 3 3 3 b a a 4 4 4 4 4 3 b 4 4 e . . . . . 
            . . e b a a b 3 3 3 3 3 a a a 4 4 4 4 4 3 3 b 4 4 e . . . . . . 
            . . e e b b a a b 3 3 a 4 4 4 4 4 3 3 3 b 4 4 4 e . . . . . . . 
            . . . e e e b b a a b 4 4 4 b 3 3 3 b 4 4 4 4 e . . . . . . . . 
            . . . . e b e e e b b b b b b b b 4 4 4 4 e e . . . . . . . . . 
            . . . . . e e b b b b 4 4 4 4 4 4 4 4 e e . . . . . . . . . . . 
            . . . . . . . e e e b b b 4 4 4 e e e . . . . . . . . . . . . . 
            . . . . . . . . . . e e e e e e . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
            `, "DONUTSO", 20, 5)
    }
}
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    if (scene2 == "overworld") {
        show_switcher_menu()
    }
})
function spriteWalk (sprite: Sprite, direction: number) {
    if (sprites.readDataBoolean(sprite, "walking")) {
        return
    }
    sprites.setDataBoolean(sprite, "walking", true)
    walkAnimationTime = 200
    if (direction == 0) {
        if (!(tiles.tileIsWall(tiles.locationInDirection(tiles.locationOfSprite(sprite), CollisionDirection.Top)))) {
            animation.runMovementAnimation(
            sprite,
            "l 0 -16",
            walkAnimationTime,
            false
            )
        }
    } else if (direction == 1) {
        if (!(tiles.tileIsWall(tiles.locationInDirection(tiles.locationOfSprite(sprite), CollisionDirection.Right)))) {
            animation.runMovementAnimation(
            sprite,
            "l 16 0",
            walkAnimationTime,
            false
            )
        }
    } else if (direction == 2) {
        if (!(tiles.tileIsWall(tiles.locationInDirection(tiles.locationOfSprite(sprite), CollisionDirection.Bottom)))) {
            animation.runMovementAnimation(
            sprite,
            "l 0 16",
            walkAnimationTime,
            false
            )
        }
    } else {
        if (!(tiles.tileIsWall(tiles.locationInDirection(tiles.locationOfSprite(sprite), CollisionDirection.Left)))) {
            animation.runMovementAnimation(
            sprite,
            "l -16 0",
            walkAnimationTime,
            false
            )
        }
    }
    pause(walkAnimationTime)
    tiles.placeOnTile(sprite, tiles.locationOfSprite(sprite))
    sprites.setDataBoolean(sprite, "walking", false)
    if (sprite.tileKindAt(TileDirection.Center, myTiles.tile33)) {
        encounter = getRandomEncounter()
        if (encounter) {
            startBattle(currentSucromon, encounter)
        }
    } else if (sprite.tileKindAt(TileDirection.Center, myTiles.tile5)) {
        healTeam()
    }
}
function checkBattleEnd () {
    if (statusbars.getStatusBarAttachedTo(StatusBarKind.Health, currentSucromon).value == 0) {
        if (doesTeamHaveAnyHealth()) {
            show_switcher_menu()
        } else {
            story.queueStoryPart(function () {
                changeScene("battle end")
            })
            story.queueStoryPart(function () {
                story.printDialog("OUR TEAM IS EXHAUSTED!", 80, 90, 50, 150, 15, 1)
            })
            story.queueStoryPart(function () {
                story.printDialog("WE RUN AWAY CRYING", 80, 90, 50, 150, 15, 1)
            })
            healTeam()
            story.queueStoryPart(function () {
                openOverworld()
            })
            story.queueStoryPart(function () {
                tiles.placeOnRandomTile(overworldPlayer, myTiles.tile5)
            })
        }
    } else if (statusbars.getStatusBarAttachedTo(StatusBarKind.Health, otherSucromon).value == 0) {
        story.queueStoryPart(function () {
            changeScene("battle end")
        })
        story.queueStoryPart(function () {
            story.printDialog("" + sprites.readDataString(otherSucromon, "name") + " RAN AWAY CRYING", 80, 90, 50, 150, 15, 1)
        })
        story.queueStoryPart(function () {
            story.printDialog("" + sprites.readDataString(currentSucromon, "name") + " GOT SOME XP!", 80, 90, 50, 150, 15, 1)
        })
        story.queueStoryPart(function () {
            showOrHideSucromon(currentSucromon, false)
        })
        story.queueStoryPart(function () {
            statusbars.getStatusBarAttachedTo(StatusBarKind.XP, currentSucromon).value += statusbars.getStatusBarAttachedTo(StatusBarKind.Health, otherSucromon).max
            pause(1000)
        })
        story.queueStoryPart(function () {
            if (statusbars.getStatusBarAttachedTo(StatusBarKind.XP, currentSucromon).value == statusbars.getStatusBarAttachedTo(StatusBarKind.XP, currentSucromon).max) {
                sprites.changeDataNumberBy(currentSucromon, "attack", 2)
                statusbars.getStatusBarAttachedTo(StatusBarKind.Health, currentSucromon).max += 5
                statusbars.getStatusBarAttachedTo(StatusBarKind.Health, currentSucromon).value += 1000
                statusbars.getStatusBarAttachedTo(StatusBarKind.XP, currentSucromon).max += 10
                statusbars.getStatusBarAttachedTo(StatusBarKind.XP, currentSucromon).value = 0
                pause(1000)
                story.printDialog("" + sprites.readDataString(currentSucromon, "name") + " LEVELED UP!", 80, 90, 50, 150, 15, 1)
            }
        })
        story.queueStoryPart(function () {
            showOrHideSucromon(currentSucromon, true)
        })
        story.queueStoryPart(function () {
            openOverworld()
        })
        return true
    }
    return false
}
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (scene2 == "battle mode") {
        if (selectedMenuItem == fightMenuItem) {
            battleFight()
        } else if (selectedMenuItem == catchMenuItem) {
            battleCatch()
        } else if (selectedMenuItem == switchMenuItem) {
            battleSwitch()
        } else {
            battleRun()
        }
    } else if (scene2 == "sucromon switcher") {
        if (0 < statusbars.getStatusBarAttachedTo(StatusBarKind.Health, selected_sucromon_member).value) {
            setCurrentSucromon(selected_sucromon_member)
            if (lastScene == "battle mode") {
                changeScene(lastScene)
                createBattleMenu()
                showOrHideSucromon(otherSucromon, false)
                wildSucromonMove()
            } else if (lastScene == "overworld") {
                openOverworld()
            }
        } else {
            switcher_cursor.say(":(", 1000)
        }
    } else {
    	
    }
})
function switchSucromon () {
    nextSucromon = (sucromonTeam.indexOf(currentSucromon) + 1) % sucromonTeam.length
    setCurrentSucromon(sucromonTeam[nextSucromon])
}
function wildSucromonMove () {
    story.queueStoryPart(function () {
        animation.runMovementAnimation(
        otherSucromon,
        animation.animationPresets(animation.easeLeft),
        animationTime,
        false
        )
        pause(animationTime)
        scene.cameraShake(2, 200)
        statusbars.getStatusBarAttachedTo(StatusBarKind.Health, currentSucromon).value += 0 - sprites.readDataNumber(otherSucromon, "attack")
        animation.runMovementAnimation(
        otherSucromon,
        animation.animationPresets(animation.easeRight),
        animationTime,
        false
        )
        pause(animationTime)
        checkBattleEnd()
    })
}
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    moveBattleMenuSelection(3)
    if (scene2 == "overworld") {
        spriteWalk(overworldPlayer, 3)
    }
})
function battleSwitch () {
    show_switcher_menu()
}
function createBattleMenu () {
    fightMenuItem = createMenuItemSprite("FIGHT")
    fightMenuItem.left = 10
    fightMenuItem.top = 60
    catchMenuItem = createMenuItemSprite("CATCH")
    catchMenuItem.left = 90
    catchMenuItem.top = 60
    runMenuItem = createMenuItemSprite("RUN")
    runMenuItem.left = 90
    runMenuItem.top = 90
    switchMenuItem = createMenuItemSprite("SWITCH")
    switchMenuItem.left = 10
    switchMenuItem.top = 90
    battleMenuIsOpen = true
    selectedMenuItem = fightMenuItem
    cursor = sprites.create(img`
        . . . . . . b b b b a a . . . . 
        . . . . b b d d d 3 3 3 a a . . 
        . . . b d d d 3 3 3 3 3 3 a a . 
        . . b d d 3 3 3 3 3 3 3 3 3 a . 
        . b 3 d 3 3 3 3 3 b 3 3 3 3 a b 
        . b 3 3 3 3 3 a a 3 3 3 3 3 a b 
        b 3 3 3 3 3 a a 3 3 3 3 d a 4 b 
        b 3 3 3 3 b a 3 3 3 3 3 d a 4 b 
        b 3 3 3 3 3 3 3 3 3 3 d a 4 4 e 
        a 3 3 3 3 3 3 3 3 3 d a 4 4 4 e 
        a 3 3 3 3 3 3 3 d d a 4 4 4 e . 
        a a 3 3 3 d d d a a 4 4 4 e e . 
        . e a a a a a a 4 4 4 4 e e . . 
        . . e e b b 4 4 4 4 b e e . . . 
        . . . e e e e e e e e . . . . . 
        . . . . . . . . . . . . . . . . 
        `, SpriteKind.Player)
    cursor.right = selectedMenuItem.left
    cursor.y = selectedMenuItem.y
}
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    moveBattleMenuSelection(1)
    if (scene2 == "overworld") {
        spriteWalk(overworldPlayer, 1)
    }
})
function openOverworld () {
    changeScene("overworld")
    tiles.setTilemap(tiles.createTilemap(hex`10001000151b0e0e0e0e0e0e0e0e0e0e0e0e0e0e151b0e0e0e0e0e0e0e0e0e0e0e0e0e0e151b0e0e0e0e0e0e0e20202020200e0e151b0e0f101010110e20202020200e0e151b0e0d1212130c0e20202020200e0e151b0e030a0a0a0b0e20202020200e0e151b0e06020202070e0e0e0e0e0e0e0e151b0e06010201070e0e0e0e0e0e0e0e151b1a09050405080e0e0e0e0e0e0e0e151b190e0e1e0e0e0e17180e1f0e0e0e151c16161616161616161616161616161515151515151515151515151515151514141414141414141414141414141414151515151515151515151515151515151d1d1d1d1d1d1d1d1d1d1d1d1d1d1d1d0e0e0e0e0e0e0e0e0e0e0e0e0e0e0e0e`, img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . 2 2 2 2 2 . . . . . . . . 
        . . . 2 2 2 2 2 . . . . . . . . 
        . . . 2 2 2 2 2 . . . . . . . . 
        . . . 2 2 2 2 2 . . . . . . . . 
        . . . 2 2 2 2 2 . . . . . . . . 
        . . 2 2 2 . 2 2 . . . . . . . . 
        . . 2 . . . . . . 2 2 . 2 . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, [myTiles.transparency16,myTiles.tile1,myTiles.tile2,myTiles.tile3,myTiles.tile5,myTiles.tile6,myTiles.tile7,myTiles.tile8,myTiles.tile9,myTiles.tile10,myTiles.tile11,myTiles.tile12,myTiles.tile13,myTiles.tile14,myTiles.tile4,myTiles.tile16,myTiles.tile17,myTiles.tile18,myTiles.tile19,myTiles.tile20,myTiles.tile21,myTiles.tile22,myTiles.tile23,myTiles.tile24,myTiles.tile25,myTiles.tile26,myTiles.tile27,myTiles.tile28,myTiles.tile29,myTiles.tile30,myTiles.tile31,myTiles.tile32,myTiles.tile33], TileScale.Sixteen))
    if (!(overworldPlayer)) {
        overworldPlayer = sprites.create(img`
            e e e . . . . e e e . . . . 
            c d d c . . c d d c . . . . 
            c b d d f f d d b c . . . . 
            c 3 b d d b d b 3 c . . . . 
            f b 3 d d d d 3 b f . . . . 
            e d d d d d d d d e . . . . 
            e d f d d d d f d e . b f b 
            f d d f d d f d d f . f d f 
            f b d d b b d d 2 f . f d f 
            . f 2 2 2 2 2 2 b b f f d f 
            . f b d d d d d d b b d b f 
            . f d d d d d b d d f f f . 
            . f d f f f d f f d f . . . 
            . f f . . f f . . f f . . . 
            `, SpriteKind.Player)
        tiles.placeOnRandomTile(overworldPlayer, myTiles.tile5)
    }
    scene.cameraFollowSprite(overworldPlayer)
    overworldPlayer.setFlag(SpriteFlag.Invisible, false)
}
function getRandomEncounter () {
    if (Math.percentChance(50)) {
        return getSucromon(text_list[randint(0, text_list.length - 1)])
    }
    return [][0]
}
function setCurrentSucromon (sucromon_member: Sprite) {
    showOrHideSucromon(currentSucromon, true)
    currentSucromon = sucromon_member
    moveSucromon(currentSucromon, battlePositionX, battlePositionY)
    showOrHideSucromon(currentSucromon, false)
}
function doesTeamHaveAnyHealth () {
    for (let value of sucromonTeam) {
        if (statusbars.getStatusBarAttachedTo(StatusBarKind.Health, value).value > 0) {
            return true
        }
    }
    return false
}
controller.down.onEvent(ControllerButtonEvent.Pressed, function () {
    moveBattleMenuSelection(2)
    if (scene2 == "overworld") {
        spriteWalk(overworldPlayer, 2)
    }
})
sprites.onOverlap(SpriteKind.SwitcherCursor, SpriteKind.SucromonChoice, function (sprite, otherSprite) {
    if (scene2 == "sucromon switcher") {
        selected_sucromon_member = sprites.readDataSprite(otherSprite, "sucromon")
        selected_sucromon_bar = statusbars.getStatusBarAttachedTo(StatusBarKind.Health, selected_sucromon_member)
        switcher_health.max = selected_sucromon_bar.max
        switcher_health.value = selected_sucromon_bar.value
        selected_sucromon_bar = statusbars.getStatusBarAttachedTo(StatusBarKind.XP, selected_sucromon_member)
        switcher_xp.max = selected_sucromon_bar.max
        switcher_xp.value = selected_sucromon_bar.value
        sucromon_label.setText(sprites.readDataString(selected_sucromon_member, "name"))
        sucromon_label.x = 80
    } else {
    	
    }
})
function addSucromonToTeam (newSucromonMember: Sprite) {
    sucromonTeam.push(newSucromonMember)
}
function battleRun () {
    openOverworld()
}
function startBattle (mySucromon: Sprite, enemySucromon: Sprite) {
    changeScene("start battle mode")
    moveSucromon(enemySucromon, 130, 20)
    moveSucromon(mySucromon, battlePositionX, battlePositionY)
    currentSucromon = mySucromon
    otherSucromon = enemySucromon
    story.queueStoryPart(function () {
        showOrHideSucromon(enemySucromon, false)
    })
    story.queueStoryPart(function () {
        story.printDialog("A WILD " + sprites.readDataString(enemySucromon, "name") + " APPEARS!", 80, 90, 50, 150)
    })
    story.queueStoryPart(function () {
        story.printDialog("GO GET 'EM, " + sprites.readDataString(mySucromon, "name") + "!", 80, 90, 50, 150)
    })
    story.queueStoryPart(function () {
        showOrHideSucromon(mySucromon, false)
        createBattleMenu()
    })
    story.queueStoryPart(function () {
        changeScene("battle mode")
    })
}
function battleFight () {
    story.queueStoryPart(function () {
        animation.runMovementAnimation(
        currentSucromon,
        animation.animationPresets(animation.easeRight),
        animationTime,
        false
        )
        pause(animationTime)
        statusbars.getStatusBarAttachedTo(StatusBarKind.Health, otherSucromon).value += 0 - sprites.readDataNumber(currentSucromon, "attack")
        animation.runMovementAnimation(
        currentSucromon,
        animation.animationPresets(animation.easeLeft),
        animationTime,
        false
        )
        pause(animationTime)
    })
    story.queueStoryPart(function () {
        if (!(checkBattleEnd())) {
            wildSucromonMove()
        }
    })
}
function moveSucromon (theSucromon: Sprite, x: number, y: number) {
    theSucromon.setPosition(x, y)
    sprites.readDataSprite(theSucromon, "label").top = theSucromon.bottom + 14
    sprites.readDataSprite(theSucromon, "label").left = theSucromon.left - 7
}
function createMenuItemSprite (text: string) {
    newMenuItem = textsprite.create(text, 1, 15)
    newMenuItem.setMaxFontHeight(8)
    newMenuItem.setBorder(0, 0, 2)
    newMenuItem.setKind(SpriteKind.BattleMenuText)
    return newMenuItem
}
function showOrHideSucromon (theSucromon: Sprite, shouldHide: boolean) {
    theSucromon.setFlag(SpriteFlag.Invisible, shouldHide)
    sprites.readDataSprite(theSucromon, "label").setFlag(SpriteFlag.Invisible, shouldHide)
    statusbars.getStatusBarAttachedTo(StatusBarKind.Health, theSucromon).setFlag(SpriteFlag.Invisible, shouldHide)
    statusbars.getStatusBarAttachedTo(StatusBarKind.XP, theSucromon).setFlag(SpriteFlag.Invisible, shouldHide)
}
// What decides if we can catch a scuromon?
// 
// 1. Randomness
// 2. Health
// 3. Catchability
function canCatchSucromon () {
    if (Math.percentChance(5)) {
        return false
    }
    catchPercentHealth = statusbars.getStatusBarAttachedTo(StatusBarKind.Health, otherSucromon).value / statusbars.getStatusBarAttachedTo(StatusBarKind.Health, otherSucromon).max
    if (Math.percentChance(catchPercentHealth * 100)) {
        return false
    }
    return true
}
function createSucromon (portrait: Image, name: string, health: number, attack: number) {
    newSucromon = sprites.create(portrait, SpriteKind.Sucromon)
    statusbar = statusbars.create(32, 5, StatusBarKind.Health)
    statusbar.attachToSprite(newSucromon, 2, 0)
    statusbar.positionDirection(CollisionDirection.Bottom)
    statusbar.setLabel("HP")
    statusbar.max = health
    statusbar.value = health
    statusbar.z = newSucromon.z
    xpBar = statusbars.create(32, 5, StatusBarKind.XP)
    xpBar.setColor(8, 9)
    xpBar.attachToSprite(newSucromon, 8, 0)
    xpBar.positionDirection(CollisionDirection.Bottom)
    xpBar.setLabel("XP")
    xpBar.setStatusBarFlag(StatusBarFlag.SmoothTransition, false)
    xpBar.max = 100
    xpBar.value = 0
    xpBar.setStatusBarFlag(StatusBarFlag.SmoothTransition, true)
    xpBar.z = newSucromon.z
    textSprite = textsprite.create(name)
    textSprite.setMaxFontHeight(8)
    sprites.setDataSprite(newSucromon, "label", textSprite)
    sprites.setDataString(newSucromon, "name", name)
    sprites.setDataNumber(newSucromon, "attack", attack)
    showOrHideSucromon(newSucromon, true)
    return newSucromon
}
let textSprite: TextSprite = null
let xpBar: StatusBarSprite = null
let statusbar: StatusBarSprite = null
let newSucromon: Sprite = null
let catchPercentHealth = 0
let newMenuItem: TextSprite = null
let selected_sucromon_bar: StatusBarSprite = null
let battleMenuIsOpen = false
let nextSucromon = 0
let selected_sucromon_member: Sprite = null
let encounter: Sprite = null
let walkAnimationTime = 0
let CatchSuccessful = false
let otherSucromon: Sprite = null
let sucrOrb: Sprite = null
let lastScene = ""
let overworldPlayer: Sprite = null
let switcher_cursor: Sprite = null
let sucromon_label: TextSprite = null
let switcher_xp: StatusBarSprite = null
let switcher_health: StatusBarSprite = null
let row = 0
let col = 0
let sucromon_choice: Sprite = null
let sucromon_member: Sprite = null
let header_text_sprite: TextSprite = null
let background_cover: Sprite = null
let cursor: Sprite = null
let catchMenuItem: TextSprite = null
let fightMenuItem: TextSprite = null
let runMenuItem: TextSprite = null
let switchMenuItem: TextSprite = null
let selectedMenuItem: TextSprite = null
let scene2 = ""
let battlePositionX = 0
let battlePositionY = 0
let currentSucromon: Sprite = null
let cameraAnchor: Sprite = null
let sucromonTeam: Sprite[] = []
let text_list: string[] = []
let animationTime = 0
animationTime = 800
text_list = [
"DONUTSO",
"CONEY",
"CAKER",
"HONEBADG",
"ROLYPOL",
"GRIFLIME"
]
sucromonTeam = [getSucromon("DONUTSO"), getSucromon("CONEY")]
cameraAnchor = sprites.create(img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    `, SpriteKind.Player)
currentSucromon = sucromonTeam[0]
battlePositionY = 20
battlePositionX = 30
openOverworld()
