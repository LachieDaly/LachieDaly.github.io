---
title: "How Easy Is Fable to Use? I Handed It My Whole Site to Find Out"
date: "2026-07-05"
description: "A follow-up experiment: giving Anthropic's new Claude Fable model a vague to-do list for this site and seeing how far it gets."
slug: "how-easy-fable-is-to-use"
---

The first post on this blog was about using an AI coding agent to build the blog itself. Since then, the tooling has kept moving — Anthropic recently released the Claude 5 family, and the model I've been using lately is **Claude Fable 5**. This post is the follow-up experiment: how easy is Fable to actually use for real maintenance work on a real (if small) codebase?

Spoiler: easy enough that the post you're reading was one bullet point in the prompt.

## The Test

Last time I wrote a careful, detailed prompt — tech constraints, file formats, the works. This time I deliberately didn't. I gave Fable a short, honestly pretty vague to-do list for this site:

- Styling improvements "across the board"
- A design change to my Overlap word game so it stops accidentally revealing the hidden shared word after your first correct guess
- Write this blog post

That first item is the kind of request that used to make AI tools flail. "Make it better" with no acceptance criteria. The second one is more interesting than it looks: it's not a bug fix, it's a game-design problem. The old version removed solved words from the board, which meant that after one correct guess you could deduce the secret overlap word by elimination. Fixing that properly means rethinking how solved categories are displayed without leaking information — something you have to actually *reason* about, not just pattern-match.

## What Happened

Fable read through the whole site first — every page, the game components, the blog pipeline — before touching anything. Then it just... did the work.

For the game, it landed on a design I'm happier with than my own first idea: every word stays on the board for the whole game, all of them stay selectable, and a correct guess tints all three words in that category's colour. Because the whole guess gets coloured — shared word included — nothing on the board singles it out. When the shared word turns up in a second solved category, its tile blends both colours, which is a nice little payoff moment. The reveal of which word was the overlap only happens once the game is over, when it can't spoil anything.

For the styling, it made a series of small, sensible calls rather than one dramatic redesign: a sticky header, proper active states on the navigation, consistent hover and keyboard-focus behaviour, small motion touches on cards. The kind of polish pass I always mean to do and never sit down for.

It also caught something I didn't ask about: the typography plugin that styles these blog posts was installed but never actually wired up, so every post had been rendering with the plugin's styles silently missing. It noticed while doing the styling pass, fixed it, and mentioned it. That's the moment that sold me — not the code it wrote, but the thing it *noticed*.

## So, How Easy?

Compared to my first experiment a year and a half ago, the difference is mostly in how little I had to specify. Last time, the quality of the output tracked the quality of my prompt almost one-to-one. This time, "styling improvements across the board" produced work I'd have signed off on from a colleague — because the model went and built the context it needed instead of guessing from the prompt alone.

A few observations:

- **Vague is now viable.** You still get better results with clear intent, but you no longer pay a steep penalty for under-specifying the mechanical details. Fable filled the gaps with the conventions already in my codebase, not with generic boilerplate.
- **It reasons about the problem, not just the code.** The game fix required understanding *why* the old design leaked information. It got that, and the fix addressed the actual flaw rather than the symptom.
- **Review is still the job.** Nothing about my take from the first post has changed here. I read every line before merging. The difference is that reviewing Fable's output feels like reviewing a good PR, not like grading homework.

## The Recursive Bit

And yes — this post was written by Fable, about Fable, as part of the same request that restyled the site, reviewed by me before publishing. The first post ended by saying the agent is "a very fast collaborator, not a replacement for thinking." Still true. But the collaborator got noticeably better at its half of the arrangement, and my half is increasingly just taste and judgement.

That feels like a fair trade. Taste and judgement were the fun parts anyway.
