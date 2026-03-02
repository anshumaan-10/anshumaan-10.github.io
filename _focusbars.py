html = open('index.html', encoding='utf-8').read()

MARKER1 = '      <div class="sec-rule" aria-hidden="true"></div>\n      <p class="mono muted reveal">Not hypotheticals.'
if MARKER1 in html:
    html = html.replace(MARKER1,
        '      <div class="sec-rule" aria-hidden="true"></div>\n'
        '      <div class="sec-focus-bar"><strong>Why I\'m focused here:</strong>&nbsp; '
        'Real security engineers get called at 2&thinsp;am. These are the incidents I resolved — '
        'what I detected, how I responded, and what I shipped to prevent recurrence.</div>\n'
        '      <p class="mono muted reveal">Not hypotheticals.', 1)
    print('OK case-studies focus bar')
else:
    print('MISS case-studies')

MARKER2 = '      <div class="sec-rule" aria-hidden="true"></div>\n      <p class="mono muted reveal">Source to prod.'
if MARKER2 in html:
    html = html.replace(MARKER2,
        '      <div class="sec-rule" aria-hidden="true"></div>\n'
        '      <div class="sec-focus-bar"><strong>Why I\'m focused here:</strong>&nbsp; '
        'Architecture is where security either holds or breaks. I design systems where the pipeline '
        'enforces trust end-to-end &mdash; from git commit to Kubernetes runtime, every transition is verified.</div>\n'
        '      <p class="mono muted reveal">Source to prod.', 1)
    print('OK architecture focus bar')
else:
    print('MISS architecture')

open('index.html', 'w', encoding='utf-8').write(html)
print(f'Done: {len(html.splitlines())} lines')
