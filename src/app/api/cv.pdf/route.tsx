import type { NextRequest } from 'next/server';
import { Document, Page, Text, View, StyleSheet, pdf } from '@react-pdf/renderer';
import { Buffer } from 'buffer';
import { getInfo, UI } from '@/data/content';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const lang = (searchParams.get('lang') === 'bg' ? 'bg' : 'en') as 'en' | 'bg';
  const theme = (searchParams.get('theme') === 'dark' ? 'dark' : 'light') as 'light' | 'dark';

  const data = getInfo(lang);
  const t = lang === 'en' ? UI.en : UI.bg;
  const isDark = theme === 'dark';

  const colors = isDark
    ? { bg: '#0a0a0a', text: '#fafafa', sub: '#d4d4d4', border: '#27272a', badgeBg: '#18181b' }
    : { bg: '#ffffff', text: '#0a0a0a', sub: '#525252', border: '#e5e7eb', badgeBg: '#f4f4f5' };

  const styles = StyleSheet.create({
    page: { padding: 32, fontSize: 10, color: colors.text, backgroundColor: colors.bg, fontFamily: 'Helvetica' },
    h1: { fontSize: 22, fontWeight: 700 },
    h2: { fontSize: 14, marginTop: 16, marginBottom: 6, fontWeight: 700 },
    sub: { color: colors.sub },
    row: { flexDirection: 'row', gap: 8, flexWrap: 'wrap' },
    section: { marginTop: 8, borderTopWidth: 1, borderTopColor: colors.border, paddingTop: 8 },
    badge: { fontSize: 8, paddingHorizontal: 6, paddingVertical: 3, borderRadius: 10, backgroundColor: colors.badgeBg, color: colors.text, marginRight: 4, marginBottom: 4 },
    li: { flexDirection: 'row', marginBottom: 3 },
    bullet: { width: 8, textAlign: 'center' as const },
    jobHeader: { flexDirection: 'row', justifyContent: 'space-between' },
    tiny: { fontSize: 8 },
  });

  const Doc = (
    <Document title={`Vasil Vasilev CV (${lang.toUpperCase()})`}>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View>
          <Text style={styles.h1}>{data.name}</Text>
          <Text style={styles.sub}>{data.tag}</Text>
          <View style={[styles.row, { marginTop: 6 }]}>
            <Text style={styles.sub}>{data.location}</Text>
            <Text style={styles.sub}>•</Text>
            <Text style={styles.sub}>{data.email}</Text>
            <Text style={styles.sub}>•</Text>
            <Text style={styles.sub}>{data.phone}</Text>
            {data.github ? (
              <>
                <Text style={styles.sub}>•</Text>
                <Text style={styles.sub}>{data.github}</Text>
              </>
            ) : null}
          </View>
        </View>

        {/* Summary */}
        <View style={styles.section}>
          <Text style={styles.h2}>Summary</Text>
          <Text>{data.summary}</Text>
        </View>

        {/* Skills */}
        <View style={styles.section}>
          <Text style={styles.h2}>{t.coreSkills}</Text>
          <View style={[styles.row, { marginTop: 4 }]}>
            {data.skills.map((s, i) => (
              <Text key={i} style={styles.badge}>
                {s}
              </Text>
            ))}
          </View>
        </View>

        {/* Experience */}
        <View style={styles.section}>
          <Text style={styles.h2}>{t.experience}</Text>
          {data.experience.map((job, i) => (
            <View key={i} style={{ marginTop: 6 }}>
              <View style={styles.jobHeader}>
                <Text style={{ fontWeight: 700 }}>
                  {job.title} — {job.company}
                </Text>
                <Text style={styles.sub}>
                  &nbsp;{job.start}–{job.end} • {job.location}
                </Text>
              </View>
              <View style={{ marginTop: 4 }}>
                {job.bullets.map((b, j) => (
                  <View key={j} style={styles.li}>
                    <Text style={styles.bullet}>•</Text>
                    <Text>{b}</Text>
                  </View>
                ))}
              </View>
            </View>
          ))}
        </View>

        {/* Projects */}
        <View style={styles.section}>
          <Text style={styles.h2}>{t.projects}</Text>
          <Text style={[styles.sub, { marginBottom: 4 }]}>{t.projectsNote}</Text>
          {data.projects.map((p, i) => (
            <View key={i} style={{ marginTop: 6 }}>
              <Text style={{ fontWeight: 700 }}>{p.name}</Text>
              <Text style={[styles.tiny, styles.sub]}>{p.role}</Text>
              <Text style={{ marginTop: 2 }}>{p.description}</Text>
              <View style={[styles.row, { marginTop: 3 }]}>
                {p.stack.map((s, k) => (
                  <Text key={k} style={styles.badge}>
                    {s}
                  </Text>
                ))}
              </View>
              <View style={[styles.row, { marginTop: 2 }]}>
                {p.live && p.live !== '(private)' ? (
                  <Text style={styles.sub}>Live: {p.live}</Text>
                ) : (
                  <Text style={styles.sub}>Live: {t.private}</Text>
                )}
                <Text style={styles.sub}>•</Text>
                {p.repo && p.repo !== '(private)' ? (
                  <Text style={styles.sub}>Repo: {p.repo}</Text>
                ) : (
                  <Text style={styles.sub}>Repo: {t.private}</Text>
                )}
              </View>
            </View>
          ))}
        </View>

        {/* Footer */}
        <View style={[styles.section, { marginTop: 10 }]}>
          <Text style={styles.tiny}>{t.footerNote(data.name)}</Text>
        </View>
      </Page>
    </Document>
  );

  const instance = pdf(Doc);

  // Prefer toBlob (works on Node 18+ in Vercel). Typed without `any`.
  const maybeToBlob = (instance as unknown as { toBlob?: () => Promise<Blob> }).toBlob;
  if (typeof maybeToBlob === 'function') {
    const blob = await maybeToBlob.call(instance);
    const ab = await blob.arrayBuffer();
    const body = new Uint8Array(ab);
    return new Response(body, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="Vasil_Vasilev_CV_${lang.toUpperCase()}.pdf"`,
        'Cache-Control': 'no-store',
      },
    });
  }

  // Fallback: toBuffer (older versions). Can return Buffer or Uint8Array.
  const maybeToBuffer = (instance as unknown as { toBuffer?: () => Promise<Uint8Array | ArrayBuffer | Buffer> }).toBuffer;
  if (typeof maybeToBuffer === 'function') {
    const result = await maybeToBuffer.call(instance);
    const body =
      result instanceof Uint8Array
        ? result
        : Buffer.isBuffer(result)
        ? new Uint8Array(result.buffer, result.byteOffset, result.byteLength)
        : new Uint8Array(result as ArrayBuffer);

    return new Response(body, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="Vasil_Vasilev_CV_${lang.toUpperCase()}.pdf"`,
        'Cache-Control': 'no-store',
      },
    });
  }

  // Last resort: string output
  const maybeToString = (instance as unknown as { toString?: () => Promise<string> }).toString;
  const str = typeof maybeToString === 'function' ? await maybeToString.call(instance) : '%PDF-1.4\n%%EOF';
  const body = new TextEncoder().encode(str);

  return new Response(body, {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="Vasil_Vasilev_CV_${lang.toUpperCase()}.pdf"`,
      'Cache-Control': 'no-store',
    },
  });
}
