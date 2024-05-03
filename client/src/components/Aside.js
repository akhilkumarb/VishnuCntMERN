import React from 'react';
import './Aside.css';

export default function Aside() {
  return (
    <aside>

        <div className="aside_input">
            <input type="text" placeholder="Search Twitter"></input>

        </div>

        <div className="aside_container">
            <h2>What's happening?</h2>
            <blockquote className="twitter-tweet">
                <p lang="en" dir="ltr">Save the date, because <a
                        href="https://twitter.com/hashtag/JavaOne?src=hash&amp;ref_src=twsrc%5Etfw">#JavaOne</a> is
                    back! Join the world’s premier <a
                        href="https://twitter.com/hashtag/developer?src=hash&amp;ref_src=twsrc%5Etfw">#developer</a>
                    conference in Las Vegas at <a href="https://twitter.com/Oracle?ref_src=twsrc%5Etfw">@Oracle</a>
                    CloudWorld October 16–20, 2022.<br /><br />Subscribe for the latest news about registration, the call
                    for papers, luminary speakers, and more. <a
                        href="https://t.co/hhSf3dMGc1">https://t.co/hhSf3dMGc1</a> <a
                        href="https://t.co/OeDFukcM8K">pic.twitter.com/OeDFukcM8K</a></p>&mdash; Java (@java) <a
                    href="https://twitter.com/java/status/1506310994112483328?ref_src=twsrc%5Etfw">March 22, 2022</a>
            </blockquote>
            <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

        </div>

    </aside>
  );
}
