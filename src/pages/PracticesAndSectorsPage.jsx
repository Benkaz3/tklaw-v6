import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import LoadingDots from '../components/LoadingDots'
import useContentful from '../useContentful'
import heroBg from '../assets/practices_hero_bg.webp'
import Breadcrumb from '../components/Breadcrumb'
import { Helmet } from 'react-helmet-async';
import useSeo from '../seo/useSeo';

const PracticesAndSectorsSection = () => {
  const { t, i18n } = useTranslation()
  const language = i18n.language
  const location = useLocation()
  const pagePath =
    language === 'vi'
      ? '/vi/linh-vuc-va-nganh-nghe/:slug'
      : '/en/practices-and-sectors/:slug'

  const { data, loading, error } = useContentful([
    {
      content_type: 'practice',
      order: 'fields.title',
      locale: language,
    },
  ])

  const seo = useSeo('PracticesAndSectors')

  const [selectedTab, setSelectedTab] = useState('practices')
  const [expandedRow, setExpandedRow] = useState(null)

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search)
    let tabFromURL = searchParams.get('tab')

    if (language === 'vi') {
      if (tabFromURL === 'sectors') {
        tabFromURL = 'nganh-nghe'
      } else if (tabFromURL === 'practices') {
        tabFromURL = 'linh-vuc'
      }
    }

    if (tabFromURL === 'nganh-nghe' || tabFromURL === 'sectors') {
      setSelectedTab('sectors')
    } else if (tabFromURL === 'linh-vuc' || tabFromURL === 'practices') {
      setSelectedTab('practices')
    }
  }, [location.search, language])

  if (!heroBg || loading || error) {
    if (loading) {
      return (
        <div className="flex items-center justify-center h-screen text-center py-10">
          <LoadingDots />
        </div>
      )
    }
    if (error) {
      return null
    }
  }

  const entries = data?.practice || []
  const practices = entries.filter((entry) => entry.fields.isPractice)
  const sectors = entries.filter((entry) => !entry.fields.isPractice)

  const toggleRow = (id) => {
    setExpandedRow((prev) => (prev === id ? null : id))
  }

  const renderList = (list) =>
    list.map((item) => {
      const isExpanded = expandedRow === item.sys.id
      return (
        <div key={item.sys.id} className="border-b border-gray-300">
          <div
            className={`flex justify-between items-center p-4 cursor-pointer hover:bg-gray-100 transition-all ${
              isExpanded ? 'bg-gray-100' : 'bg-white'
            }`}
            onClick={() => toggleRow(item.sys.id)}
          >
            <h3 className="font-primary text-lg font-semibold text-left">
              {item.fields.title}
            </h3>
            <span className="text-xl font-bold">{isExpanded ? '-' : '+'}</span>
          </div>
          {isExpanded && (
            <div className="p-4 bg-gray-50 border-gray-300">
              <p className="text-text mb-2">{item.fields.introduction}</p>
              <Link to={pagePath.replace(':slug', item.fields.slug)}>
                <button className="mt-2 text-primary hover:text-secondary font-semibold">
                  {t('homepage.link_text')}
                </button>
              </Link>
            </div>
          )}
        </div>
      )
    })

  return (
    <section className="py-10 bg-transparent">
         <Helmet>
        <title>{seo.Title}</title>
        <meta name="description" content={seo.Description} />
        <meta name="keywords" content={seo.Keywords.join(', ')} />
      </Helmet>
      <section
        className="relative h-[25vh] bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        <div className="absolute inset-0 bg-black opacity-50" />
      </section>
      <Breadcrumb />
      <div className="max-w-container-desktop mx-auto px-4 mt-8">
        {t('homepage.practices_and_sectors_title') && (
          <h1 className="font-primary text-center text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-text">
            {t('homepage.practices_and_sectors_title')}
          </h1>
        )}
        <div className="flex justify-start mb-2">
          <button
            className={`px-6 py-2 rounded-t-md font-semibold ${
              selectedTab === 'practices'
                ? 'bg-primary text-white'
                : 'bg-gray-200'
            }`}
            onClick={() => setSelectedTab('practices')}
          >
            {t('homepage.practices_section.title')}
          </button>
          <button
            className={`ml-2 px-6 py-2 rounded-t-md font-semibold ${
              selectedTab === 'sectors'
                ? 'bg-primary text-white'
                : 'bg-gray-200'
            }`}
            onClick={() => setSelectedTab('sectors')}
          >
            {t('homepage.client_sectors')}
          </button>
        </div>
        <div className="space-y-1 overflow-hidden border border-gray-300">
          {selectedTab === 'practices'
            ? renderList(practices)
            : renderList(sectors)}
        </div>
      </div>
    </section>
  )
}

export default PracticesAndSectorsSection