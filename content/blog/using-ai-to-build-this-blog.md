---
title: "Using AI to Build This Blog (And Documenting the Process)"
date: "2025-01-15"
description: "I wrote a prompt, handed it to a GitHub coding agent, and watched it build a blog. Here's what happened."
slug: "using-ai-to-build-this-blog"
---

I've been meaning to add a blog to my personal site for a while. Not because I have a backlog of polished articles ready to go — more because I wanted a low-friction place to write about the things I'm actually doing. And lately, a lot of what I'm doing involves experimenting with AI-assisted development tools.

So I figured: why not use AI to build the blog itself, and write the first post about it?

## The Prompt

I started by writing a prompt that described what I wanted. Not just "add a blog to my site," but something more specific: the tech constraints, the content format, the UX I had in mind. Things like:

- Store posts as Markdown files with frontmatter
- Use `gray-matter` to parse them and `remark` to render the content
- Generate static pages at build time (no server-side rendering — the site lives on GitHub Pages)
- A `/blog` listing page sorted by date, and a `/blog/[slug]` page per post
- Match the existing styling of the site

Writing the prompt carefully mattered. The more specific I was, the less the agent had to guess.

## Handing It Off

Once I had a prompt I was happy with, I passed it into a GitHub coding agent. I won't pretend I knew exactly what it would produce — that was part of the experiment. The agent explored the repo, figured out the existing stack (Next.js App Router, Tailwind CSS v4, TypeScript, static export), and started making changes.

It installed the necessary packages, created the file structure, wrote the utility functions for reading and parsing markdown, and scaffolded out the pages. It also ran the build to verify everything worked.

## Observing and Iterating

Watching the agent work was genuinely interesting. It read the existing code to understand the styling conventions before writing anything new. It checked for security vulnerabilities in the packages it was about to install. It ran the build and caught errors before committing.

That said, it wasn't magic. There were a few things I had to think about:

- **Specificity matters.** A vague prompt produces vague output. The more I described the constraints and the desired result, the better the output matched what I actually wanted.
- **You still need to review it.** The agent produced working code, but I read through it. Understanding what was generated — and why — is important if you're going to maintain it.
- **It's fast.** What would've taken me an hour of context-switching and looking up docs took the agent a few minutes.

## Reflections on AI-Assisted Development

I've been a software engineer for a few years now, and I've watched the tooling around AI evolve pretty quickly. My current take:

AI coding tools are most useful when you have a clear picture of what you want but don't want to spend time on the mechanical parts — setting up boilerplate, wiring together libraries you've used before, writing the obvious code. They're less useful when the problem is ambiguous or when you're trying to reason through a genuinely novel design.

For a task like "add a blog to a Next.js site," the agent was excellent. The problem is well-defined, the solution space is familiar, and the constraints were explicit in the prompt. It let me focus on the content rather than the plumbing.

What I don't think changes: the need to understand what you're building and why. You still need to be able to read the output, evaluate whether it's correct, and maintain it going forward. The agent is a very fast collaborator, not a replacement for thinking.

---

More posts coming. Probably about things I'm building, tools I'm using, and occasionally something I found interesting enough to write down.
