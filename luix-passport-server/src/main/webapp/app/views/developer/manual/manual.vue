<template>
  <!--begin::manual card-->
  <div class="card">
    <!--begin::Body-->
    <div class="card-body p-10 p-lg-15">
      <!--begin::Content main-->
      <div class="mb-14">
        <!--begin::Heading-->
        <div class="mb-15">
          <!--begin::Title-->
          <h1 class="fs-2x text-dark mb-10 text-center">{{$t('platform-name')}}®️ - {{$t('platform-desc')}}</h1>
          <!--end::Title-->
        </div>
        <!--end::Heading-->
        <!--begin::Body-->

        <!--begin::Section-->
        <div class="pb-lg-20">
          <!--begin::Content-->
          <!--end::Content-->
          <!--begin::Row-->
          <div class="row g-10">
            <!--begin::Col-->
            <div class="col-md-12">
              <div class="card card-rounded bgi-no-repeat bgi-size-cover bgi-position-center min-h-900px intro-y" style="background-image:url('media/bg/car-bg-4.jpg')">
                <img :src="getAssetPath(`media/logos/secvector-with-logo-white.svg`)" class="mh-70px position-absolute start-25 top-0 mt-20 opacity-75"/>
                <!--begin::Text-->
                <div class="fs-4 text-white opacity-75 fw-semibold ms-20 me-20 position-absolute top-25">{{$t('form.login.dt-msg')}}</div>
                <!--end::Text-->
              </div>
            </div>
            <!--end::Col-->
          </div>
          <!--end::Row-->
        </div>
        <!--end::Section-->

        <!--begin::Block-->
        <div class="pb-lg-20">
          <!--begin::Title-->
          <h2 class="fw-bold text-dark mb-8">背景</h2>
          <!--end::Title-->
          <!--begin::List-->
          <ul class="fs-4 fw-semibold mb-6">
            <li>
              <span class="text-gray-700">智能网联汽车将会是未来的主流，为了实现自动驾驶，需要大规模应用可信关键技术，保障智能化汽车运行的安全可靠，建设智能安全网联交通生态环境</span>
            </li>
            <li>
              <span class="text-gray-700">随着软件定义汽车进一步推进，智能化、网联化导致软件复杂度和数据量的暴增。导致潜在的漏洞和数据泄露等安全风险与日俱增，全过程多维度的安全保障刻不容缓</span>
            </li>
            <li>
              <span class="text-gray-700">各家OEM基本已具备基础的网络安全保护技术，这些安全技术通常是较传统的，适合检测传统的安全漏洞和攻击，缺乏对新型攻击、未知行为模式的检测识别能力</span>
            </li>
            <li>
              <span class="text-gray-700">技术研究正从单车网络安全，转向面向大数据的车辆协同安全，综合运用版本比对、车型借鉴、地域分析、安全行为聚类、异常事件序列检测、多模态关联等技术</span>
            </li>
          </ul>
          <!--end::List-->
          <!--begin::Row-->
          <div class="row g-10">
            <!--begin::Col-->
            <div class="col-md-4">
              <div class="bgi-no-repeat bgi-position-center bgi-size-cover card-rounded min-h-300px" style="background-image:url('media/attack/yandex-taxi.png')"></div>
              <!--begin::Body-->
              <div class="mt-5">
                  <!--begin::Title-->
                  <a href="https://www.51cto.com/article/717934.html" target="_blank" class="fs-4 text-dark fw-bold text-hover-primary text-dark lh-base">黑客对Yandex Taxi发起网络攻击</a>
                  <!--end::Title-->
                  <!--begin::Text-->
                  <div class="fw-semibold fs-5 text-gray-600 text-dark mt-3">黑客利用俄罗斯叫车软件Yandex Taxi在莫斯科造成了严重的交通堵塞，据悉，网络攻击导致几十辆出租车在同一时间被召唤。这次攻击发生在9月1日，导致前往Kutuzovsky Prospect的车辆停滞不前，而这条大街本来就非常繁忙。</div>
                  <!--end::Text-->
                </div>
                <!--end::Body-->
            </div>
            <!--end::Col-->
            <!--begin::Col-->
            <div class="col-md-4">
              <div class="bgi-no-repeat bgi-position-center bgi-size-cover card-rounded min-h-300px" style="background-image:url('media/attack/toyota.png')"></div>
              <!--begin::Body-->
              <div class="mt-5">
                  <!--begin::Title-->
                  <a href="https://m.thepaper.cn/baijiahao_24425136" target="_blank" class="fs-4 text-dark fw-bold text-hover-primary text-dark lh-base">丰田全球供应商信息管理系统认证机制存在漏洞</a>
                  <!--end::Title-->
                  <!--begin::Text-->
                  <div class="fw-semibold fs-5 text-gray-600 text-dark mt-3">丰田全球供应商信息管理系统的认证机制漏洞可能导致重大供应链中断、敏感数据泄露和广泛的经济及信誉损失，威胁整个公司的运营安全和市场地位</div>
                  <!--end::Text-->
                </div>
                <!--end::Body-->
            </div>
            <!--end::Col-->
            <!--begin::Col-->
            <div class="col-md-4">
              <div class="bgi-no-repeat bgi-position-center bgi-size-cover card-rounded min-h-300px" style="background-image:url('media/attack/schneider.jpg')"></div>
              <!--begin::Body-->
              <div class="mt-5">
                  <!--begin::Title-->
                  <a href="https://nosec.org/home/detail/2115.html" target="_blank" class="fs-4 text-dark fw-bold text-hover-primary text-dark lh-base">施耐德充电桩漏洞</a>
                  <!--end::Title-->
                  <!--begin::Text-->
                  <div class="fw-semibold fs-5 text-gray-600 text-dark mt-3">黑客破解后可以免费充电，并修改充电时间，进而破快充电桩和连接车辆电池寿命</div>
                  <!--end::Text-->
                </div>
                <!--end::Body-->
            </div>
            <!--end::Col-->
          </div>
          <!--end::Row-->
        </div>
        <!--end::Block-->

        <!--begin::Block-->
        <div class="pb-lg-20">
          <!--begin::Title-->
          <h2 class="fw-bold text-dark mb-8">项目意义</h2>
          <!--end::Title-->
          <!--begin::List-->
          <ul class="fs-4 fw-semibold mb-6">
            <li>
              <span class="text-gray-700">打造企业核心技术</span>
              <!--begin::Text-->
              <div class="fs-4 fw-semibold text-gray-700 mt-5 mb-5">智能网联汽车的可信关键技术是确保智能交通安全、保障国家安全和社会稳定的重要保障，是企业核心竞争力之一</div>
              <!--end::Text-->
            </li>
            <li class="my-2">
              <span class="text-gray-700">服务国家战略</span>
              <!--begin::Text-->
              <div class="fs-4 fw-semibold text-gray-700 mt-5 mb-5">汽车是现代制造业中的最大产业，在全世界提供3万亿美元的年产值。汽车产业有望打造成中国制造的另外一张名片。服务国家战略需求，满足新基建、智能制造、网络强国等国家战略对汽车安全的需求</div>
              <!--end::Text-->
            </li>
            <li class="my-2">
              <span class="text-gray-700">满足合规要求</span>
              <!--begin::Text-->
              <div class="fs-4 fw-semibold text-gray-700 mt-5 mb-5">遵循国际标准，满足监管要求，提升整车网络安全保障水平是最基本要求。车辆网络安全以及数据安全成为行业准入门槛，各国正通过安全相关法规重塑汽车产业</div>
              <!--end::Text-->
            </li>
            <li class="my-2">
              <span class="text-gray-700">带动产业发展</span>
              <!--begin::Text-->
              <div class="fs-4 fw-semibold text-gray-700 mt-5">汽车安全事关人民生命财产安全，可以带动网络安全、智能感知、大数据等相关产业的发展。预计2025年深圳新能源汽车年产量超200万辆，汽车工业产值达到万亿级，年出口量超60万辆</div>
              <!--end::Text-->
            </li>
          </ul>
          <!--end::List-->
        </div>
        <!--end::Block-->

        <!--begin::Section-->
        <div class="pb-lg-20">
          <!--begin::Content-->
          <!--begin::Title-->
          <h2 class="fw-bold text-dark mb-8">SecVector®️平台子系统</h2>
          <!--end::Title-->
          <!--end::Content-->
          <!--begin::Separator-->
          <div class="separator separator-dashed mb-9"></div>
          <!--end::Separator-->
          <!--begin::Row-->
          <div class="row g-10">
            <!--begin::Col-->
            <div class="col-md-4">
              <!--begin::Hot sales post-->
              <div class="card-xl-stretch me-md-6">
                <!--begin::Overlay-->
                <a class="d-block overlay" data-fslightbox="lightbox-hot-sales" href="http://www.baidu.com">
                  <!--begin::Image-->
                  <div class="overlay-wrapper bgi-no-repeat bgi-position-center bgi-size-cover card-rounded min-h-275px" style="background-image:url('media/app-screenshot/secops.png')"></div>
                  <!--end::Image-->
                  <!--begin::Action-->
                  <div class="overlay-layer card-rounded bg-dark bg-opacity-25">
                    <KTIcon icon-name="eye" icon-class="fs-3x text-white"/>
                  </div>
                  <!--end::Action-->
                </a>
                <!--end::Overlay-->
                <!--begin::Body-->
                <div class="mt-5">
                  <!--begin::Title-->
                  <a href="#" class="fs-4 text-dark fw-bold text-hover-primary text-dark lh-base">SecOps®️ - 安全检测运维平台</a>
                  <!--end::Title-->
                  <!--begin::Text-->
                  <div class="fw-semibold fs-5 text-gray-600 text-dark mt-3">基于Web的运维平台，支持汽车资产管理(如：零部件、车型、汽车等)、检测规则配置、安全威胁告警及漏洞可视化等功能</div>
                  <!--end::Text-->
                </div>
                <!--end::Body-->
              </div>
              <!--end::Hot sales post-->
            </div>
            <!--end::Col-->
            <!--begin::Col-->
            <div class="col-md-4">
              <!--begin::Hot sales post-->
              <div class="card-xl-stretch mx-md-3">
                <!--begin::Overlay-->
                <a class="d-block overlay" data-fslightbox="lightbox-hot-sales" href="http://www.baidu.com">
                  <!--begin::Image-->
                  <div class="overlay-wrapper bgi-no-repeat bgi-position-center bgi-size-cover card-rounded min-h-275px" style="background-image:url('media/app-screenshot/seccloud.jpg')"></div>
                  <!--end::Image-->
                  <!--begin::Action-->
                  <div class="overlay-layer card-rounded bg-dark bg-opacity-25">
                    <KTIcon icon-name="eye" icon-class="fs-3x text-white"/>
                  </div>
                  <!--end::Action-->
                </a>
                <!--end::Overlay-->
                <!--begin::Body-->
                <div class="mt-5">
                  <!--begin::Title-->
                  <a href="#" class="fs-4 text-dark fw-bold text-hover-primary text-dark lh-base">SecCloud®️ - 汽车云大数据实时检测引擎</a>
                  <!--end::Title-->
                  <!--begin::Text-->
                  <div class="fw-semibold fs-5 text-gray-600 text-dark mt-3">通过对车载设备采集车辆实时数据，如发动机状况、车速、油耗等，以及已设置的检测规则来实现对于传统安全威胁的实时检测</div>
                  <!--end::Text-->
                </div>
                <!--end::Body-->
              </div>
              <!--end::Hot sales post-->
            </div>
            <!--end::Col-->
            <!--begin::Col-->
            <div class="col-md-4">
              <!--begin::Hot sales post-->
              <div class="card-xl-stretch ms-md-6">
                <!--begin::Overlay-->
                <a class="d-block overlay" data-fslightbox="lightbox-hot-sales" href="http://www.baidu.com">
                  <!--begin::Image-->
                  <div class="overlay-wrapper bgi-no-repeat bgi-position-center bgi-size-cover card-rounded min-h-275px" style="background-image:url('media/app-screenshot/secbrain.jpg')"></div>
                  <!--end::Image-->
                  <!--begin::Action-->
                  <div class="overlay-layer card-rounded bg-dark bg-opacity-25">
                    <KTIcon icon-name="eye" icon-class="fs-3x text-white"/>
                  </div>
                  <!--end::Action-->
                </a>
                <!--end::Overlay-->
                <!--begin::Body-->
                <div class="mt-5">
                  <!--begin::Title-->
                  <a href="#" class="fs-4 text-dark fw-bold text-hover-primary text-dark lh-base">SecBrain®️ - 汽车云AI算法检测平台</a>
                  <!--end::Title-->
                  <!--begin::Text-->
                  <div class="fw-semibold fs-5 text-gray-600 text-dark mt-3">对采集的海量车辆数据进行离线深度学习和数据挖掘来完成模型训练，并实现对于新型安全威胁的实时检测</div>
                  <!--end::Text-->
                </div>
                <!--end::Body-->
              </div>
              <!--end::Hot sales post-->
            </div>
            <!--end::Col-->
          </div>
          <!--end::Row-->
        </div>
        <!--end::Section-->


        <!--begin::Block-->
        <div class="pb-lg-20">
          <!--begin::Title-->
          <h2 class="fw-bold text-dark mb-8">SecVector®️平台功能</h2>
          <!--end::Title-->
          <!--begin::List-->
          <ul class="fs-4 fw-semibold mb-6">
            <li>
              <span class="text-gray-700">支持汽车、车型、零部件等相关资产的安全风险检测</span>
            </li>
            <li class="my-2">
              <span class="text-gray-700">支持零部件级别的漏洞检测</span>
            </li>
            <li class="my-2">
              <span class="text-gray-700">全链路关联车、云、手机端多源海量日志，识别出车辆信号，记录关键事件</span>
            </li>
            <li class="my-2">
              <span class="text-gray-700">支持预警机制，在发生安全威胁之前，快速发出预警通知，为企业安全团队应对威胁提供时间窗口(待确认)</span>
            </li>
            <li class="my-2">
              <span class="text-gray-700">针对特定5个场景有预测安全威胁的能力(待确认)</span>
            </li>
            <li class="my-2">
              <span class="text-gray-700">支持基于检测规则的单车维度的传统安全威胁检测</span>
            </li>
            <li class="my-2">
              <span class="text-gray-700">支持基于检测规则的多车维度的安全威胁检测</span>
            </li>
            <li class="my-2">
              <span class="text-gray-700">实现基于机器学习统计海量真实数据而获得的异常阈值，而非通过人类经验设定该值。解决依赖于人类经验定义阈值的缺陷，并可以基于实时数据及时计算出最新阈值</span>
            </li>
            <li class="my-2">
              <span class="text-gray-700">通过数据关联聚合分析、深度学习和数据挖掘，支持新型安全威胁检测</span>
            </li>
            <li class="my-2">
              <span class="text-gray-700">具备根本原因分析能力，支持攻击链定位。同时还可以辅助安全人员进行事后取证分析</span>
            </li>
            <li class="my-2">
              <span class="text-gray-700">支持管理维护安全资产数据</span>
            </li>
            <li class="my-2">
              <span class="text-gray-700">支持检测规则灵活配置，检测规则修改后即时生效</span>
            </li>
            <li class="my-2">
              <span class="text-gray-700">支持威胁模拟器，可以针对所有检测器模拟制造威胁数据，用于验证检测能力</span>
            </li>
            <li class="my-2">
              <span class="text-gray-700">具有灵活和有扩展的部署选项，支持主流公有云部署，包括华为云、AWS等，以解决可扩展、服务不可用以及服务器性能问题</span>
            </li>
            <li class="my-2">
              <span class="text-gray-700">支持自动响应开放接口，可对接其他车辆管理、IT基础设施、SOC等第三方系统，实现检测到告警后的快速处理响应</span>
            </li>
            <li class="my-2">
              <span class="text-gray-700">具备暗网信息获取能力，支持汽车网络安全威胁情报分析</span>
            </li>
            <li class="my-2">
              <span class="text-gray-700">支持保护用户隐私信息，防止用户个人信息泄露</span>
            </li>
            <li class="my-2">
              <span class="text-gray-700">支持多租户架构，可以在单个平台内按照品牌实施数据隔离</span>
            </li>
            <li class="my-2">
              <span class="text-gray-700">根据法规要求，支持针对每个数据源、数据字段进行可配置化的时间间隔清除数据</span>
            </li>
            <li class="my-2">
              <span class="text-gray-700">支持用户登录访问并基于角色的用户管理，可根据权限进行数据访问限制</span>
            </li>
          </ul>
          <!--end::List-->
        </div>
        <!--end::Block-->
        <!--begin::Block-->
        <div class="pb-lg-20">
          <!--begin::Title-->
          <h2 class="fw-bold text-dark mb-8">新型安全威胁检测能力</h2>
          <!--end::Title-->
          <!--begin::Row-->
          <div class="row g-5 g-xl-8">
            <div class="col-xl-4">
              <!--begin::Statistics Widget 2-->
              <div class="card card-xl-stretch mb-xl-8 bg-light-success">
                <!--begin::Body-->
                <div class="card-body d-flex text-start pt-3 pb-0">
                  <div class="d-flex flex-column flex-grow-1 py-2 py-lg-13 me-2">
                    <span class="fw-bold text-success fs-4 mb-2">信号异常模型分析</span>
                    <span class="fw-semibold text-dark text-gray-700 fs-5">基于机器学习统计所有车辆历史信号值来寻找信号值分布区间，并根据设定的阈值找出信号的正常值和异常值区间，包含线性(数字类型)、非线性(字符串等)数据类型。检测器可以根据异常值区间来识别安全告警。统计间隔为一天一次</span>
                  </div>
                  <KTIcon
                    icon-name="wifi"
                    icon-class="fs-7tx text-success align-self-end"
                  />
                </div>
                <!--end::Body-->
              </div>
              <!--end::Statistics Widget 2-->
            </div>
            <div class="col-xl-4">
              <!--begin::Statistics Widget 2-->
              <div class="card card-xl-stretch mb-5 mb-xl-8 bg-light-danger">
                <!--begin::Body-->
                <div class="card-body d-flex text-start pt-3 pb-0">
                  <div class="d-flex flex-column flex-grow-1 py-2 py-lg-13 me-2">
                    <span class="fw-bold text-danger fs-4 mb-2">多信号异常模型分析</span>
                    <span class="fw-semibold text-dark text-gray-700 fs-5">基于机器学习统计所有车辆历史信号来寻找固定数量信号值组合，并找出正常和异常的信号组合。支持场景包含：车辆行驶时间分布、远程解锁时间分布、VLAN上下行流量状态、车载网络连接、TBOX电流。检测器可以根据异常值组合来识别安全告警。统计间隔为一天一次</span>
                  </div>
                  <KTIcon
                    icon-name="wifi-square"
                    icon-class="fs-7tx text-danger align-self-end"
                  />
                </div>
                <!--end::Body-->
              </div>
              <!--end::Statistics Widget 2-->
            </div>
            <div class="col-xl-4">
              <!--begin::Statistics Widget 2-->
              <div class="card card-xl-stretch mb-xl-8 bg-light-warning">
                <!--begin::Body-->
                <div class="card-body d-flex text-start pt-3 pb-0">
                  <div class="d-flex flex-column flex-grow-1 py-2 py-lg-13 me-2">
                    <!-- <span class="fw-bold text-warning fs-4 mb-2">车辆行为分析</span>
                    <span class="fw-semibold text-dark text-gray-700 fs-5">根据客户使用习惯，通过车辆数据进行深度学习和数据挖掘，获得车辆使用规律。全方位刻画车辆信息安全和数据安全的画像，构建单车整车安全脆弱点、风险地图。根据数据探索安全规律,建立车辆安全评分体系,进行车辆安全质量的量化评估</span> -->
                    <span class="fw-bold text-warning fs-4 mb-2">车型信号异常模型分析</span>
                    <span class="fw-semibold text-dark text-gray-700 fs-5">结合信号异常模型分析和多信号异常模型分析功能，针对单一车型而非所有车辆做相应的分析，寻找车型维度的信号特征</span>
                  </div>
                  <KTIcon
                    icon-name="car-2"
                    icon-class="fs-7tx text-warning align-self-end"
                  />
                </div>
                <!--end::Body-->
              </div>
              <!--end::Statistics Widget 2-->
            </div>
          </div>
          <!--end::Row-->
          <!--begin::Row-->
          <div class="row g-5 g-xl-8">
            <div class="col-xl-4">
              <!--begin::Statistics Widget 2-->
              <div class="card card-xl-stretch mb-5 mb-xl-8 bg-light-dark">
                <!--begin::Body-->
                <div class="card-body d-flex text-start pt-3 pb-0">
                  <div class="d-flex flex-column flex-grow-1 py-2 py-lg-13 me-2">
                    <span class="fw-bold text-dark fs-4 mb-2">事件链关联分析</span>
                    <span class="fw-semibold text-dark text-gray-700 fs-5">对于车辆事件(如：OBD事件、固件版本降级、认证暴力破解等)先后次序组合进行分析，找出可能为异常的事件组合，并提供异常置信度分值，也可以通过更复杂的关联分析标记出异常。统计间隔为一天一次</span>
                  </div>
                  <KTIcon
                    icon-name="abstract-21"
                    icon-class="fs-7tx text-dark align-self-end"
                  />
                </div>
                <!--end::Body-->
              </div>
              <!--end::Statistics Widget 2-->
            </div>
            <div class="col-xl-4">
              <!--begin::Statistics Widget 2-->
              <div class="card card-xl-stretch mb-xl-8 bg-light-primary">
                <!--begin::Body-->
                <div class="card-body d-flex text-start pt-3 pb-0">
                  <div class="d-flex flex-column flex-grow-1 py-2 py-lg-13 me-2">
                    <span class="fw-bold text-primary fs-4 mb-2">地域行为聚集异常检测</span>
                    <span class="fw-semibold text-dark text-gray-700 fs-5">收集并关联多源车辆定位数据，包括GPS轨迹等，确定车辆的精确位置信息。根据车辆在聚集地点的停留时间长度、聚集密度大小等指标，将高密度聚集区进行划分，再结合当时用户行为进行分析挖掘，检测出异常直接发出告警</span>
                  </div>
                  <KTIcon
                    icon-name="map"
                    icon-class="fs-7tx text-primary align-self-end"
                  />
                </div>
                <!--end::Body-->
              </div>
              <!--end::Statistics Widget 2-->
            </div>
            <div class="col-xl-4">
              <!--begin::Statistics Widget 2-->
              <div class="card card-xl-stretch mb-xl-8 bg-light-info">
                <!--begin::Body-->
                <div class="card-body d-flex text-start pt-3 pb-0">
                  <div class="d-flex flex-column flex-grow-1 py-2 py-lg-13 me-2">
                    <span class="fw-bold text-info fs-4 mb-2">车辆时空变化异常检测</span>
                    <span class="fw-semibold text-dark text-gray-700 fs-5">针对车辆行驶里程或地区跨越做真实性判定。收集车辆的历史行驶轨迹和行驶时间数据，建立车辆的时空行为基线，当监测到某车辆的当前行驶路线、车速等与该时段基线存在显著偏差时，检测出异常并直接发出告警</span>
                  </div>
                  <KTIcon
                    icon-name="rocket"
                    icon-class="fs-7tx text-info align-self-end"
                  />
                </div>
                <!--end::Body-->
              </div>
              <!--end::Statistics Widget 2-->
            </div>
          </div>
          <!--end::Row-->
          <!--begin::Row-->
          <div class="row g-5 g-xl-8">
            <div class="col-xl-4">
              <!--begin::Statistics Widget 2-->
              <div class="card card-xl-stretch mb-xl-8 bg-light-success">
                <!--begin::Body-->
                <div class="card-body d-flex text-start pt-3 pb-0">
                  <div class="d-flex flex-column flex-grow-1 py-2 py-lg-13 me-2">
                    <span class="fw-bold text-success fs-4 mb-2">非固定数量多信号异常模型分析</span>
                    <span class="fw-semibold text-dark text-gray-700 fs-5">基于机器学习统计所有车辆的所有历史信号值，挖掘各种异常信号组合并打分，找出可能存在的威胁，并供专家们继续分析研究，进而发现未知安全威胁</span>
                  </div>
                  <KTIcon
                    icon-name="abstract-17"
                    icon-class="fs-7tx text-success align-self-end"
                  />
                </div>
                <!--end::Body-->
              </div>
              <!--end::Statistics Widget 2-->
            </div>
          </div>
          <!--end::Row-->
        </div>
        <!--end::Block-->
        <!--begin::Block-->
        <div class="pb-lg-20">
          <!--begin::Title-->
          <h2 class="fw-bold text-dark mb-8">技术指标</h2>
          <!--end::Title-->
          <!--begin::Statistics-->
          <div class="card">
            <!--begin::Body-->
            <div class="card-body">
              <!--begin::Wrapper-->
              <div class="d-flex flex-center">
                <!--begin::Items-->
                <div class="d-flex flex-center flex-wrap mb-10 mx-auto gap-10 w-xl-900px">
                  <!--begin::Item-->
                  <div class="d-flex flex-column flex-center h-175px w-175px m-3 bgi-no-repeat bgi-position-center bgi-size-contain" style="background-image: url('media/svg/misc/octagon.svg')">
                    <!--begin::Content-->
                    <div class="text-center">
                      <!--begin::Symbol-->
                      <KTIcon
                        icon-name="car-2"
                        icon-class="fs-3tx text-primary"
                      />
                      <!--end::Symbol-->
                      <!--begin::Text-->
                      <div class="mt-1">
                        <!--begin::Animation-->
                        <div class="fs-lg-2hx fs-2x fw-bold text-gray-700 d-flex align-items-center">
                        <div class="min-w-70px">10</div>M+</div>
                        <!--end::Animation-->
                        <!--begin::Label-->
                        <span class="text-gray-600 fw-semibold fs-5 lh-0">Vehicles</span>
                        <!--end::Label-->
                      </div>
                      <!--end::Text-->
                    </div>
                    <!--end::Content-->
                  </div>
                  <!--end::Item-->
                  <!--begin::Item-->
                  <div class="d-flex flex-column flex-center h-175px w-175px m-3 bgi-no-repeat bgi-position-center bgi-size-contain" style="background-image: url('media/svg/misc/octagon.svg')">
                    <!--begin::Content-->
                    <div class="text-center">
                      <!--begin::Symbol-->
                      <KTIcon
                        icon-name="phone"
                        icon-class="fs-3tx text-success"
                      />
                      <!--end::Symbol-->
                      <!--begin::Text-->
                      <div class="mt-1">
                        <!--begin::Animation-->
                        <div class="fs-lg-2hx fs-2x fw-bold text-gray-700 d-flex align-items-center">
                        <div class="min-w-50px">2</div>M+</div>
                        <!--end::Animation-->
                        <!--begin::Label-->
                        <span class="text-gray-600 fw-semibold fs-5 lh-0">Phones</span>
                        <!--end::Label-->
                      </div>
                      <!--end::Text-->
                    </div>
                    <!--end::Content-->
                  </div>
                  <!--end::Item-->
                  <!--begin::Item-->
                  <div class="d-flex flex-column flex-center h-175px w-175px m-3 bgi-no-repeat bgi-position-center bgi-size-contain" style="background-image: url('media/svg/misc/octagon.svg')">
                    <!--begin::Content-->
                    <div class="text-center">
                      <!--begin::Symbol-->
                      <KTIcon
                        icon-name="shield-search"
                        icon-class="fs-3tx text-warning"
                      />
                      <!--end::Symbol-->
                      <!--begin::Text-->
                      <div class="mt-1">
                        <!--begin::Animation-->
                        <div class="fs-lg-2hx fs-2x fw-bold text-gray-700 d-flex align-items-center">
                        <div class="min-w-50px">200</div>+</div>
                        <!--end::Animation-->
                        <!--begin::Label-->
                        <span class="text-gray-600 fw-semibold fs-5 lh-0">Detectors</span>
                        <!--end::Label-->
                      </div>
                      <!--end::Text-->
                    </div>
                    <!--end::Content-->
                  </div>
                  <!--end::Item-->
                </div>
                <!--end::Items-->
              </div>
              <!--end::Wrapper-->
              
              <!--begin::Row-->
              <div class="row g-10">
                <!--begin::Col-->
                <div class="col-xl-4">
                  <div class="d-flex align-items-start">
                    <!--begin::Option-->
                    <div class="w-100 d-flex flex-column flex-center rounded-3 bg-light bg-opacity-75 py-20 px-10">
                      <!--begin::Heading-->
                      <div class="mb-7 text-center">
                        <!--begin::Title-->
                        <h1 class="text-dark mb-5 fw-bolder">检测能力</h1>
                        <!--end::Title-->
                        <!--begin::Description-->
                        <div class="text-gray-400 fw-semibold mb-5">Describe the detection abilities of platform</div>
                        <!--end::Description-->
                      </div>
                      <!--end::Heading-->
                      <!--begin::Features-->
                      <div class="w-100 mb-10 h-200px">
                        <!--begin::Item-->
                        <div class="d-flex align-items-center mb-5">
                          <KTIcon
                            icon-name="medal-star"
                            icon-class="fs-3 text-success"
                          />
                          <span class="fw-semibold fs-6 text-gray-700 flex-grow-1 ps-3">支持同时在线1000万辆汽车</span>
                          
                        </div>
                        <!--end::Item-->
                        <!--begin::Item-->
                        <div class="d-flex align-items-center mb-5">
                          <KTIcon
                            icon-name="medal-star"
                            icon-class="fs-3 text-success"
                          />
                          <span class="fw-semibold fs-6 text-gray-700 flex-grow-1 ps-3">支持同时在线200万手机端应用</span>
                        </div>
                        <!--end::Item-->
                        <!--begin::Item-->
                        <div class="d-flex align-items-center mb-5">
                          <KTIcon
                            icon-name="medal-star"
                            icon-class="fs-3 text-success"
                          />
                          <span class="fw-semibold fs-6 text-gray-700 flex-grow-1 ps-3">支持传统安全威胁检测器数量大于200</span>
                        </div>
                        <!--end::Item-->
                        <!--begin::Item-->
                        <div class="d-flex align-items-center mb-5">
                          <KTIcon
                            icon-name="medal-star"
                            icon-class="fs-3 text-success"
                          />
                          <span class="fw-semibold fs-6 text-gray-700 flex-grow-1 ps-3">支持新型安全威胁检测场景数量大于5</span>
                        </div>
                        <!--end::Item-->
                        <!--begin::Item-->
                        <div class="d-flex align-items-center mb-5">
                          <KTIcon
                            icon-name="medal-star"
                            icon-class="fs-3 text-success"
                          />
                          <span class="fw-semibold fs-6 text-gray-700 flex-grow-1 ps-3">至少实现覆盖R155法规</span>
                        </div>
                        <!--end::Item-->
                        <!--begin::Item-->
                        <div class="d-flex align-items-center mb-5">
                          <KTIcon
                            icon-name="medal-star"
                            icon-class="fs-3 text-success"
                          />
                          <span class="fw-semibold fs-6 text-gray-700 flex-grow-1 ps-3">AI算法模型数量大于5</span>
                        </div>
                        <!--end::Item-->
                      </div>
                      <!--end::Features-->
                    </div>
                    <!--end::Option-->
                  </div>
                </div>
                <!--end::Col-->
                <!--begin::Col-->
                <div class="col-xl-4">
                  <div class="d-flex align-items-start">
                    <!--begin::Option-->
                    <div class="w-100 d-flex flex-column flex-center rounded-3 bg-light bg-opacity-75 py-20 px-10">
                      <!--begin::Heading-->
                      <div class="mb-7 text-center">
                        <!--begin::Title-->
                        <h1 class="text-dark mb-5 fw-bolder">系统性能</h1>
                        <!--end::Title-->
                        <!--begin::Description-->
                        <div class="text-gray-400 fw-semibold mb-5">Describe the performance of system</div>
                        <!--end::Description-->
                      </div>
                      <!--end::Heading-->
                      <!--begin::Features-->
                      <div class="w-100 mb-10 h-200px">
                        <!--begin::Item-->
                        <div class="d-flex align-items-center mb-5">
                          <KTIcon
                            icon-name="medal-star"
                            icon-class="fs-3 text-success"
                          />
                          <span class="fw-semibold fs-6 text-gray-700 flex-grow-1 ps-3">威胁检测时延小于3秒</span>
                        </div>
                        <!--end::Item-->
                        <!--begin::Item-->
                        <div class="d-flex align-items-center mb-5">
                          <KTIcon
                            icon-name="medal-star"
                            icon-class="fs-3 text-success"
                          />
                          <span class="fw-semibold fs-6 text-gray-700 flex-grow-1 ps-3">检测规则生效时延小于2秒</span>
                        </div>
                        <!--end::Item-->
                      </div>
                      <!--end::Features-->
                    </div>
                    <!--end::Option-->
                  </div>
                </div>
                <!--end::Col-->
                <!--begin::Col-->
                <div class="col-xl-4">
                  <div class="d-flex align-items-start">
                    <!--begin::Option-->
                    <div class="w-100 d-flex flex-column flex-center rounded-3 bg-light bg-opacity-75 py-20 px-10">
                      <!--begin::Heading-->
                      <div class="mb-7 text-center">
                        <!--begin::Title-->
                        <h1 class="text-dark mb-5 fw-bolder">准确性</h1>
                        <!--end::Title-->
                        <!--begin::Description-->
                        <div class="text-gray-400 fw-semibold mb-5">Describe the accuracy of system</div>
                        <!--end::Description-->
                      </div>
                      <!--end::Heading-->
                      <!--begin::Features-->
                      <div class="w-100 mb-10 h-200px">
                        <!--begin::Item-->
                        <div class="d-flex align-items-center mb-5">
                          <KTIcon
                            icon-name="medal-star"
                            icon-class="fs-3 text-success"
                          />
                          <span class="fw-semibold fs-6 text-gray-700 flex-grow-1 ps-3">传统安全威胁检测误报率低于5%</span>
                        </div>
                        <!--end::Item-->
                        <!--begin::Item-->
                        <div class="d-flex align-items-center mb-5">
                          <KTIcon
                            icon-name="medal-star"
                            icon-class="fs-3 text-success"
                          />
                          <span class="fw-semibold fs-6 text-gray-700 flex-grow-1 ps-3">传统安全威胁检测漏报率低于1%</span>
                        </div>
                        <!--end::Item-->
                        <!--begin::Item-->
                        <div class="d-flex align-items-center mb-5">
                          <KTIcon
                            icon-name="medal-star"
                            icon-class="fs-3 text-success"
                          />
                          <span class="fw-semibold fs-6 text-gray-700 flex-grow-1 ps-3">新型安全威胁检测误报率低于30%</span>
                        </div>
                        <!--end::Item-->
                      </div>
                      <!--end::Features-->
                    </div>
                    <!--end::Option-->
                  </div>
                </div>
                <!--end::Col-->
              </div>
              <!--end::Row-->
            </div>
            <!--end::Body-->
          </div>
          <!--end::Statistics-->
        </div>
        <!--end::Block-->
        <!--begin::Block-->
        <div class="pb-lg-20">
          <!--begin::Title-->
          <h2 class="fw-bold text-dark mb-8">业务架构与技术特点</h2>
          <!--end::Title-->
          <!--begin::Row-->
          <div class="row g-10">
            <!--begin::Col-->
            <div class="col-md-12">
              <div class="mb-10 text-center">
                <img alt="architecture" :src="getAssetPath(`media/misc/arch.png`)" class="mh-600px"/>
              </div>
            </div>
            <!--end::Col-->
          </div>
          <!--end::Row-->
          <!--begin::List-->
          <ul class="fs-4 fw-semibold mb-6">
            <li>
              <span class="text-gray-700">基于流式数据处理架构</span>
              <!--begin::Text-->
              <div class="fs-4 fw-semibold text-gray-700 mt-5 mb-5">Flink本身就是为流式数据处理而设计的。流计算是将数据分为连续不断的数据流，然后在数据流上执行计算的过程。这使得其非常适合对于无边界和无顺序的海量数据进行有状态的计算</div>
              <!--end::Text-->
            </li>
            <li class="my-2">
              <span class="text-gray-700">内存计算模型</span>
              <!--begin::Text-->
              <div class="fs-4 fw-semibold text-gray-700 mt-5 mb-5">Flink将输入数据流在内存中进行操作，避免了磁盘IO。同时使用checkpoint机制来提供exactly-once的状态一致性。这大大减小了处理延迟</div>
              <!--end::Text-->
            </li>
            <li class="my-2">
              <span class="text-gray-700">高效的运行时执行</span>
              <!--begin::Text-->
              <div class="fs-4 fw-semibold text-gray-700 mt-5 mb-5">查询优化器和运行时执行非常高效，可以实现毫秒级的低延迟和高吞吐</div>
              <!--end::Text-->
            </li>
            <li class="my-2">
              <span class="text-gray-700">支持乱序处理</span>
              <!--begin::Text-->
              <div class="fs-4 fw-semibold text-gray-700 mt-5 mb-5">Flink使用事件时间而不是处理时间，可以更精确地处理乱序事件，提高并发处理能力</div>
              <!--end::Text-->
            </li>
            <li class="my-2">
              <span class="text-gray-700">可无限水平扩展</span>
              <!--begin::Text-->
              <div class="fs-4 fw-semibold text-gray-700 mt-5 mb-5">在不停机的情况下动态扩展计算资源，无缝应对增长的数据流量</div>
              <!--end::Text-->
            </li>
            <li class="my-2">
              <span class="text-gray-700">支持数据分片</span>
              <!--begin::Text-->
              <div class="fs-4 fw-semibold text-gray-700 mt-5 mb-5">通过合理的数据分片存储策略，保证海量数据合理分布到集群的多个应用节点上</div>
              <!--end::Text-->
            </li>
            <li class="my-2">
              <span class="text-gray-700">支持数据过期清除策略</span>
              <!--begin::Text-->
              <div class="fs-4 fw-semibold text-gray-700 mt-5 mb-5">通过时间窗口机制清除过期数据，保证数据量不会无限增长</div>
              <!--end::Text-->
            </li>
            <li class="my-2">
              <span class="text-gray-700">高效的检测规则匹配逻辑</span>
              <!--begin::Text-->
              <div class="fs-4 fw-semibold text-gray-700 mt-5 mb-5">安全威胁检测规则是一个规则组合组成，每个规则组由多个规则组成。系统使用高效的规则组检测引擎，可以避免重复验证规则，提高检测速度</div>
              <!--end::Text-->
            </li>
          </ul>
          <!--end::List-->
        </div>
        <!--end::Block-->

        <!--begin::Block-->
        <div class="pb-lg-20">
          <!--begin::Title-->
          <h2 class="fw-bold text-dark mb-8">安全威胁检测</h2>
          <!--end::Title-->
          <!--begin::Row-->
          <div class="row g-10">
            <!--begin::Col-->
            <div class="col-md-12">
              <div class="mb-10 text-center">
                <img alt="architecture" :src="getAssetPath(`media/misc/detection.png`)" class="mh-600px"/>
              </div>
            </div>
            <!--end::Col-->
          </div>
          <!--end::Row-->
        </div>
        <!--end::Block-->

        <!--begin::Block-->
        <div class="pb-lg-20">
          <!--begin::Title-->
          <h2 class="fw-bold text-dark mb-8">性能优化措施</h2>
          <!--end::Title-->
          <!--begin::List-->
          <ul class="fs-4 fw-semibold mb-6">
            <li>
              <span class="text-gray-700">高效数据序列化方案</span>
              <!--begin::Text-->
              <div class="fs-4 fw-semibold text-gray-700 mt-5 mb-5">使用占用空间更小的数据结构</div>
              <!--end::Text-->
            </li>
          </ul>
          <!--end::List-->
        </div>
        <!--end::Block-->
        
        <!--begin::Title-->
        <h2 class="fw-bold text-dark mb-8">竞品功能比较</h2>
        <!--end::Title-->
        <!--begin::Table-->
        <div class="mb-14">
          <!--begin::Table container-->
          <div class="table-responsive">
            <!--begin::Table-->
            <table class="table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4">
              <!--begin::Table head-->
              <thead>
                <tr class="fw-bold fs-6 text-gray-700 text-center border-0 bg-light">
                  <th class="min-w-200px rounded-start text-start ps-6"><div class="fs-4 mb-1">功能</div></th>
                  <th class="min-w-150px">
                    <a href="https://upstream.auto" target="_blank">
                      <span>
                        <img
                          :src="getAssetPath('media/logos/upstream-logo.svg')"
                          class="h-25px align-self-center mb-1"
                        />
                      </span>
                    </a>
                  </th>
                  <th class="min-w-150px">
                    <a href="https://www.callisto-auto.com" target="_blank">
                      <span>
                        <img
                          :src="getAssetPath('media/logos/callisto-logo.svg')"
                          class="h-35px align-self-center"
                        />
                      </span>
                    </a>
                  </th>
                  <th class="min-w-150px rounded-end">
                    <span>
                      <img
                        :src="getAssetPath('media/logos/secvector-with-logo.svg')"
                        class="h-20px align-self-center mb-2"
                      />
                    </span>
                  </th>
                </tr>
              </thead>
              <!--end::Table head-->
              <!--begin::Table body-->
              <tbody class="border-bottom border-dashed">
                <tr class="text-center">
                  <td class="text-start ps-6">
                    <div class="fw-semibold fs-4 text-gray-700">事件标记</div>
                  </td>
                  <td>
                    <KTIcon
                      icon-name="check"
                      icon-class="fs-2x text-success"
                    />
                  </td>
                  <td>
                    <KTIcon
                      icon-name="cross"
                      icon-class="fs-2x text-danger"
                    />
                  </td>
                  <td>
                    <KTIcon
                      icon-name="check"
                      icon-class="fs-2x text-success"
                    />
                  </td>
                </tr>
                <tr class="text-center">
                  <td class="text-start ps-6">
                    <div class="fw-semibold fs-4 text-gray-700">信号状态记录</div>
                  </td>
                  <td>
                    <KTIcon
                      icon-name="check"
                      icon-class="fs-2x text-success"
                    />
                  </td>
                  <td>
                    <KTIcon
                      icon-name="cross"
                      icon-class="fs-2x text-danger"
                    />
                  </td>
                  <td>
                    <KTIcon
                      icon-name="check"
                      icon-class="fs-2x text-success"
                    />
                  </td>
                </tr>
                <tr class="text-center">
                  <td class="text-start ps-6">
                    <div class="fw-semibold fs-4 text-gray-700">事件链检测</div>
                  </td>
                  <td>
                    <KTIcon
                      icon-name="check"
                      icon-class="fs-2x text-success"
                    />
                  </td>
                  <td>
                    <KTIcon
                      icon-name="cross"
                      icon-class="fs-2x text-danger"
                    />
                  </td>
                  <td>
                    <KTIcon
                      icon-name="check"
                      icon-class="fs-2x text-success"
                    />
                  </td>
                </tr>
                <tr class="text-center">
                  <td class="text-start ps-6">
                    <div class="fw-semibold fs-4 text-gray-700">检测条件-函数</div>
                  </td>
                  <td>
                    <KTIcon
                      icon-name="check"
                      icon-class="fs-2x text-success"
                    />
                  </td>
                  <td>
                    <KTIcon
                      icon-name="cross"
                      icon-class="fs-2x text-danger"
                    />
                  </td>
                  <td>
                    <KTIcon
                      icon-name="check"
                      icon-class="fs-2x text-success"
                    />
                  </td>
                </tr>
                <tr class="text-center">
                  <td class="text-start ps-6">
                    <div class="fw-semibold fs-4 text-gray-700">检测条件类型-事件</div>
                  </td>
                  <td>
                    <KTIcon
                      icon-name="check"
                      icon-class="fs-2x text-success"
                    />
                  </td>
                  <td>
                    <KTIcon
                      icon-name="cross"
                      icon-class="fs-2x text-danger"
                    />
                  </td>
                  <td>
                    <KTIcon
                      icon-name="check"
                      icon-class="fs-2x text-success"
                    />
                  </td>
                </tr>
                <tr class="text-center">
                  <td class="text-start ps-6">
                    <div class="fw-semibold fs-4 text-gray-700">检测条件类型-信号状态</div>
                  </td>
                  <td>
                    <KTIcon
                      icon-name="check"
                      icon-class="fs-2x text-success"
                    />
                  </td>
                  <td>
                    <KTIcon
                      icon-name="cross"
                      icon-class="fs-2x text-danger"
                    />
                  </td>
                  <td>
                    <KTIcon
                      icon-name="check"
                      icon-class="fs-2x text-success"
                    />
                  </td>
                </tr>
                <tr class="text-center">
                  <td class="text-start ps-6">
                    <div class="fw-semibold fs-4 text-gray-700">检测条件类型-异常</div>
                  </td>
                  <td>
                    <KTIcon
                      icon-name="check"
                      icon-class="fs-2x text-success"
                    />
                  </td>
                  <td>
                    <KTIcon
                      icon-name="cross"
                      icon-class="fs-2x text-danger"
                    />
                  </td>
                  <td>
                    <KTIcon
                      icon-name="check"
                      icon-class="fs-2x text-success"
                    />
                  </td>
                </tr>
                <tr class="text-center">
                  <td class="text-start ps-6">
                    <div class="fw-semibold fs-4 text-gray-700">机器学习的异常阈值</div>
                  </td>
                  <td>
                    <KTIcon
                      icon-name="check"
                      icon-class="fs-2x text-success"
                    />
                  </td>
                  <td>
                    <KTIcon
                      icon-name="cross"
                      icon-class="fs-2x text-danger"
                    />
                  </td>
                  <td>
                    <KTIcon
                      icon-name="check"
                      icon-class="fs-2x text-success"
                    />
                  </td>
                </tr>
                <tr class="text-center">
                  <td class="text-start ps-6">
                    <div class="fw-semibold fs-4 text-gray-700">分组检测</div>
                  </td>
                  <td>
                    <KTIcon
                      icon-name="check"
                      icon-class="fs-2x text-success"
                    />
                  </td>
                  <td>
                    <KTIcon
                      icon-name="cross"
                      icon-class="fs-2x text-danger"
                    />
                  </td>
                  <td>
                    <KTIcon
                      icon-name="check"
                      icon-class="fs-2x text-success"
                    />
                  </td>
                </tr>
                <tr class="text-center">
                  <td class="text-start ps-6">
                    <div class="fw-semibold fs-4 text-gray-700">车队检测</div>
                  </td>
                  <td>
                    <KTIcon
                      icon-name="check"
                      icon-class="fs-2x text-success"
                    />
                  </td>
                  <td>
                    <KTIcon
                      icon-name="cross"
                      icon-class="fs-2x text-danger"
                    />
                  </td>
                  <td>
                    <KTIcon
                      icon-name="check"
                      icon-class="fs-2x text-success"
                    />
                  </td>
                </tr>
                <tr class="text-center">
                  <td class="text-start ps-6">
                    <div class="fw-semibold fs-4 text-gray-700">安全响应开放接口对接能力</div>
                  </td>
                  <td>
                    <KTIcon
                      icon-name="check"
                      icon-class="fs-2x text-success"
                    />
                  </td>
                  <td>
                    <KTIcon
                      icon-name="cross"
                      icon-class="fs-2x text-danger"
                    />
                  </td>
                  <td>
                    <KTIcon
                      icon-name="check"
                      icon-class="fs-2x text-success"
                    />
                  </td>
                </tr>
                <tr class="text-center">
                  <td class="text-start ps-6">
                    <div class="fw-semibold fs-4 text-gray-700">安全威胁模拟器</div>
                  </td>
                  <td>
                    <KTIcon
                      icon-name="check"
                      icon-class="fs-2x text-success"
                    />
                  </td>
                  <td>
                    <KTIcon
                      icon-name="cross"
                      icon-class="fs-2x text-danger"
                    />
                  </td>
                  <td>
                    <KTIcon
                      icon-name="check"
                      icon-class="fs-2x text-success"
                    />
                  </td>
                </tr>
                <tr class="text-center">
                  <td class="text-start ps-6">
                    <div class="fw-semibold fs-4 text-gray-700">合规报告</div>
                  </td>
                  <td>
                    <KTIcon
                      icon-name="cross"
                      icon-class="fs-2x text-danger"
                    />
                  </td>
                  <td>
                    <KTIcon
                      icon-name="check"
                      icon-class="fs-2x text-success"
                    />
                  </td>
                  <td>
                    <KTIcon
                      icon-name="check"
                      icon-class="fs-2x text-success"
                    />
                  </td>
                </tr>
                <tr class="text-center">
                  <td class="text-start ps-6">
                    <div class="fw-semibold fs-4 text-gray-700">工单处理</div>
                  </td>
                  <td>
                    <KTIcon
                      icon-name="cross"
                      icon-class="fs-2x text-danger"
                    />
                  </td>
                  <td>
                    <KTIcon
                      icon-name="check"
                      icon-class="fs-2x text-success"
                    />
                  </td>
                  <td>
                    <KTIcon
                      icon-name="check"
                      icon-class="fs-2x text-success"
                    />
                  </td>
                </tr>
                <tr class="text-center">
                  <td class="text-start ps-6">
                    <div class="fw-semibold fs-4 text-gray-700">定制安全报告</div>
                  </td>
                  <td>
                    <KTIcon
                      icon-name="cross"
                      icon-class="fs-2x text-danger"
                    />
                  </td>
                  <td>
                    <KTIcon
                      icon-name="check"
                      icon-class="fs-2x text-success"
                    />
                  </td>
                  <td>
                    <KTIcon
                      icon-name="check"
                      icon-class="fs-2x text-success"
                    />
                  </td>
                </tr>
                <tr class="text-center">
                  <td class="text-start ps-6">
                    <div class="fw-semibold fs-4 text-gray-700">零部件漏洞检测</div>
                  </td>
                  <td>
                    <KTIcon
                      icon-name="cross"
                      icon-class="fs-2x text-danger"
                    />
                  </td>
                  <td>
                    <KTIcon
                      icon-name="check"
                      icon-class="fs-2x text-success"
                    />
                  </td>
                  <td>
                    <KTIcon
                      icon-name="check"
                      icon-class="fs-2x text-success"
                    />
                  </td>
                </tr>
                <tr class="text-center">
                  <td class="text-start ps-6">
                    <div class="fw-semibold fs-4 text-gray-700">地域行为聚类分析</div>
                  </td>
                  <td>
                    <KTIcon
                      icon-name="cross"
                      icon-class="fs-2x text-danger"
                    />
                  </td>
                  <td>
                    <KTIcon
                      icon-name="cross"
                      icon-class="fs-2x text-danger"
                    />
                  </td>
                  <td>
                    <KTIcon
                      icon-name="check"
                      icon-class="fs-2x text-success"
                    />
                  </td>
                </tr>
                <tr class="text-center">
                  <td class="text-start ps-6">
                    <div class="fw-semibold fs-4 text-gray-700">车辆时空异常变化检测</div>
                  </td>
                  <td>
                    <KTIcon
                      icon-name="cross"
                      icon-class="fs-2x text-danger"
                    />
                  </td>
                  <td>
                    <KTIcon
                      icon-name="cross"
                      icon-class="fs-2x text-danger"
                    />
                  </td>
                  <td>
                    <KTIcon
                      icon-name="check"
                      icon-class="fs-2x text-success"
                    />
                  </td>
                </tr>
                <tr class="text-center">
                  <td class="text-start ps-6">
                    <div class="fw-semibold fs-4 text-gray-700">安全威胁预测能力</div>
                  </td>
                  <td>
                    <KTIcon
                      icon-name="cross"
                      icon-class="fs-2x text-danger"
                    />
                  </td>
                  <td>
                    <KTIcon
                      icon-name="cross"
                      icon-class="fs-2x text-danger"
                    />
                  </td>
                  <td>
                    <KTIcon
                      icon-name="check"
                      icon-class="fs-2x text-success"
                    />
                  </td>
                </tr>
                <tr class="text-center">
                  <td class="text-start ps-6">
                    <div class="fw-semibold fs-4 text-gray-700">Web运维平台提供良好的用户体验</div>
                  </td>
                  <td>
                    <KTIcon
                      icon-name="cross"
                      icon-class="fs-2x text-danger"
                    />
                  </td>
                  <td>
                    <KTIcon
                      icon-name="cross"
                      icon-class="fs-2x text-danger"
                    />
                  </td>
                  <td>
                    <KTIcon
                      icon-name="check"
                      icon-class="fs-2x text-success"
                    />
                  </td>
                </tr>
                <tr class="text-center">
                  <td class="text-start ps-6">
                    <div class="fw-semibold fs-4 text-gray-700">极端数据库泄露场景下的隐私保护能力</div>
                  </td>
                  <td>
                    <KTIcon
                      icon-name="cross"
                      icon-class="fs-2x text-danger"
                    />
                  </td>
                  <td>
                    <KTIcon
                      icon-name="cross"
                      icon-class="fs-2x text-danger"
                    />
                  </td>
                  <td>
                    <KTIcon
                      icon-name="check"
                      icon-class="fs-2x text-success"
                    />
                  </td>
                </tr>
              </tbody>
              <!--end::Table body-->
            </table>
            <!--end::Table-->
          </div>
          <!--end::Table container-->
        </div>
        <!--end::Table-->

        <!--begin::Title-->
        <h2 class="fw-bold text-dark mb-8">近年全球汽车网络安全重要事件</h2>
        <!--end::Title-->
        <!--begin::Table-->
        <div class="mb-14">
          <!--begin::Table container-->
          <div class="table-responsive">
            <!--begin::Table-->
            <table class="table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4">
              <!--begin::Table head-->
              <thead>
                <tr class="fw-bold fs-6 text-gray-700 text-center border-0 bg-light">
                  <th class="min-w-100px rounded-start text-start ps-6">发布时间</th>
                  <th class="min-w-70px">攻击者</th>
                  <th class="min-w-200px">主题</th>
                  <th class="min-w-100px">攻击目标</th>
                  <th class="min-w-150px">影响</th>
                  <th class="min-w-150px">资料来源</th>
                </tr>
              </thead>
              <!--end::Table head-->
              <!--begin::Table body-->
              <tbody class="border-bottom border-dashed fw-bold">
                <tr class="text-center text-gray-700">
                  <td class="text-start ps-6">
                    2023/09
                  </td>
                  <td class="text-start">
                    白帽
                  </td>
                  <td class="text-start">
                    小鹏P5/G9调试入口被公开
                  </td>
                  <td class="text-start">
                    车机
                  </td>
                  <td class="text-start d-flex flex-column">
                    <span>数据或隐私泄露</span>
                    <span>设备被远程控制或彻底损坏</span>
                  </td>
                  <td class="text-start">
                    https://github.com/hackxpeng/hackp5g9
                  </td>
                </tr>
                <tr class="text-center text-gray-700">
                  <td class="text-start ps-6">
                    2023/05
                  </td>
                  <td class="text-start">
                    白帽
                  </td>
                  <td class="text-start">
                    现代/起亚汽车本地升级被破解
                  </td>
                  <td class="text-start">
                    数字钥匙
                  </td>
                  <td class="text-start d-flex flex-column">
                    <span>数据或隐私泄露</span>
                    <span>恶意软件的植入</span>
                  </td>
                  <td class="text-start">
                    https://programmingwithstyle.com/posts/howihackedmycar/
                  </td>
                </tr>
                <tr class="text-center text-gray-700">
                  <td class="text-start ps-6">
                    2023/05
                  </td>
                  <td class="text-start">
                    安全企业
                  </td>
                  <td class="text-start">
                    TESLA MODEL3/Y蓝牙链路层中继攻击
                  </td>
                  <td class="text-start">
                    数字钥匙
                  </td>
                  <td class="text-start">
                    用户汽车被盗
                  </td>
                  <td class="text-start">
                    https://research.nccgroup.com/2022/05/15/technical-advisory-tesla-ble-phone-as-a-key-passive-entry-vulnerable-to-relay-attacks/
                  </td>
                </tr>
                <tr class="text-center text-gray-700">
                  <td class="text-start ps-6">
                    2023/04
                  </td>
                  <td class="text-start">
                    安全企业
                  </td>
                  <td class="text-start">
                    使用故障注入越狱TESLA车载信息娱乐系统
                  </td>
                  <td class="text-start">
                    车载信息娱乐系统
                  </td>
                  <td class="text-start d-flex flex-column">
                    <span>数据或隐私泄露</span>
                    <span>触发法律责任</span>
                  </td>
                  <td class="text-start">
                    https://i.blackhat.com/BH-US-23/Presentations/US-23-Werling-Jailbreaking-Teslas.pdf?_gl=1*1i2ovq2*_gcl_au*MTQxMjUzOTQwNi4xNjk4OTgzMzAx*_ga*ODE0Njg5NDQ3LjE2OTg5ODMzMDQ.*_ga_K4JK67TFYV*MTY5OTM0Njc0NC4zLjEuMTY5OTM0ODI2Mi4wLjAuMA..&_ga=2.245734852.1590960220.1699348261-814689447.1698983304
                  </td>
                </tr>
                <tr class="text-center text-gray-700">
                  <td class="text-start ps-6">
                    2022/12/20
                  </td>
                  <td class="text-start">
                    企业内部员工
                  </td>
                  <td class="text-start">
                    蔚来汽车遭遇重大数据泄露事件，泄露内容包括员工数据、车主身份证、地址等敏感信息，涉及数百万条数据
                  </td>
                  <td class="text-start">
                    数据库
                  </td>
                  <td class="text-start">
                    影响了企业品牌信誉
                  </td>
                  <td class="text-start">
                    https://app.nio.com/app/web/v2/share_comment?id=2284166&type=essay
                  </td>
                </tr>
                <tr class="text-center text-gray-700">
                  <td class="text-start ps-6">
                    2022/11/06
                  </td>
                  <td class="text-start">
                    黑帽
                  </td>
                  <td class="text-start">
                    网络攻击导致丹麦最大的火车公司业务关闭
                  </td>
                  <td class="text-start">
                    服务器
                  </td>
                  <td class="text-start">
                    服务或商业中断
                  </td>
                  <td class="text-start">
                    https://aicarloans.com/cyber-attack-shut-down-trains-in-denmark-security-ai-car-loans/
                  </td>
                </tr>
                <tr class="text-center text-gray-700">
                  <td class="text-start ps-6">
                    2022/11/03
                  </td>
                  <td class="text-start">
                    黑帽
                  </td>
                  <td class="text-start">
                    勒索软件集团攻击并威胁发布来自德国某Tier1的的被盗机密文件
                  </td>
                  <td class="text-start">
                    服务器
                  </td>
                  <td class="text-start">
                    数据或隐私泄露
                  </td>
                  <td class="text-start">
                    https://www.bleepingcomputer.com/news/security/lockbit-ransomware-claims-attack-on-continental-automotive-giant/
                  </td>
                </tr>
                <tr class="text-center text-gray-700">
                  <td class="text-start ps-6">
                    2022/10/24
                  </td>
                  <td class="text-start">
                    黑帽
                  </td>
                  <td class="text-start">
                    英国汽车零售巨头遭受勒索软件攻击
                  </td>
                  <td class="text-start">
                    服务器
                  </td>
                  <td class="text-start d-flex flex-column">
                    <span>数据或隐私泄露</span>
                    <span>服务或商业中断</span>
                  </td>
                  <td class="text-start">
                    https://www.bleepingcomputer.com/news/security/pendragon-car-dealer-refuses-60-million-lockbit-ransomware-demand/
                  </td>
                </tr>
                <tr class="text-center text-gray-700">
                  <td class="text-start ps-6">
                    2022/10/18
                  </td>
                  <td class="text-start">
                    黑帽
                  </td>
                  <td class="text-start">
                    针对乌克兰和波兰运输部门的勒索软件活动
                  </td>
                  <td class="text-start">
                    服务器
                  </td>
                  <td class="text-start">
                    服务或业务中断
                  </td>
                  <td class="text-start">
                    https://www.scmagazine.com/analysis/ransomware/new-ransomware-targets-transportation-sectors-in-ukraine-poland
                  </td>
                </tr>
                <tr class="text-center text-gray-700">
                  <td class="text-start ps-6">
                    2022/10/18
                  </td>
                  <td class="text-start">
                    黑帽
                  </td>
                  <td class="text-start">
                    黑客揭示如何使用JBL蓝牙扬声器盗窃各种车辆
                  </td>
                  <td class="text-start">
                    遥控门禁系统
                  </td>
                  <td class="text-start">
                    汽车盗窃
                  </td>
                  <td class="text-start">
                    https://cybernews.com/news/jbl-bluetooth-speakers-give-car-thieves-the-va-va-voom/
                  </td>
                </tr>
                <tr class="text-center text-gray-700">
                  <td class="text-start ps-6">
                    2022/10/17
                  </td>
                  <td class="text-start">
                    黑帽
                  </td>
                  <td class="text-start">
                    欧洲警方逮捕了一个试图盗窃数千辆法国OEM汽车的汽车黑客犯罪集团
                  </td>
                  <td class="text-start">
                    遥控门禁系统
                  </td>
                  <td class="text-start">
                    汽车盗窃
                  </td>
                  <td class="text-start">
                    https://www.pcmag.com/news/police-in-europe-arrest-car-theft-gang-that-tried-to-hack-thousands-of
                  </td>
                </tr>
                <tr class="text-center text-gray-700">
                  <td class="text-start ps-6">
                    2022/09
                  </td>
                  <td class="text-start">
                    黑帽
                  </td>
                  <td class="text-start">
                    YANDEX出租车被黑客操纵
                  </td>
                  <td class="text-start">
                    应用程序/API
                  </td>
                  <td class="text-start">
                    造成了长达两小时的交通堵塞
                  </td>
                  <td class="text-start">
                    https://baijiahao.baidu.com/s?id=1743182367663105980&wfr=spider&for=pc
                  </td>
                </tr>
                <tr class="text-center text-gray-700">
                  <td class="text-start ps-6">
                    2022/02
                  </td>
                  <td class="text-start">
                    黑帽
                  </td>
                  <td class="text-start">
                    丰田全球供应商信息管理系统认证机制存在漏洞
                  </td>
                  <td class="text-start">
                    应用软件/API
                  </td>
                  <td class="text-start d-flex flex-column">
                    <span>数据或隐私泄露</span>
                    <span>导致重大供应链中断</span>
                  </td>
                  <td class="text-start">
                    https://eaton-works.com/2023/02/06/toyota-gspims-hack/
                  </td>
                </tr>
              </tbody>
              <!--end::Table body-->
            </table>
            <!--end::Table-->
          </div>
          <!--end::Table container-->
        </div>
        <!--end::Table-->

        <!--begin::Title-->
        <h2 class="fw-bold text-dark mb-8">汽车网络安全机构</h2>
        <!--end::Title-->
        <!--begin::Table-->
        <div class="mb-14">
          <!--begin::Table container-->
          <div class="table-responsive">
            <!--begin::Table-->
            <table class="table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4">
              <!--begin::Table head-->
              <thead>
                <tr class="fw-bold fs-6 text-gray-700 text-center border-0 bg-light">
                  <th class="min-w-100px rounded-start text-start ps-6">机构种类</th>
                  <th class="min-w-100px">机构名称</th>
                </tr>
              </thead>
              <!--end::Table head-->
              <!--begin::Table body-->
              <tbody class="border-bottom border-dashed fw-bold">
                <tr class="text-center text-gray-700">
                  <td class="text-start ps-6">
                    安全公司
                  </td>
                  <td>
                    Baidu X-Team
                  </td>
                </tr>
                <tr class="text-center text-gray-700">
                  <td class="text-start ps-6">
                    汽车改装公司
                  </td>
                  <td>
                    Bimmer Tech
                  </td>
                </tr>
                <tr class="text-center text-gray-700">
                  <td class="text-start ps-6">
                    白帽
                  </td>
                  <td>
                    Charlie Miller
                  </td>
                </tr>
                <tr class="text-center text-gray-700">
                  <td class="text-start ps-6">
                    白帽
                  </td>
                  <td>
                    David Colombo
                  </td>
                </tr>
                <tr class="text-center text-gray-700">
                  <td class="text-start ps-6">
                    安全公司
                  </td>
                  <td>
                    GoGoByte
                  </td>
                </tr>
                <tr class="text-center text-gray-700">
                  <td class="text-start ps-6">
                    安全公司
                  </td>
                  <td>
                    IOActive
                  </td>
                </tr>
                <tr class="text-center text-gray-700">
                  <td class="text-start ps-6">
                    安全公司
                  </td>
                  <td>
                    KeenLab
                  </td>
                </tr>
                <tr class="text-center text-gray-700">
                  <td class="text-start ps-6">
                    白帽
                  </td>
                  <td>
                    Martin Herbert
                  </td>
                </tr>
                <tr class="text-center text-gray-700">
                  <td class="text-start ps-6">
                    学校研究机构
                  </td>
                  <td>
                    MIT CSAIL
                  </td>
                </tr>
                <tr class="text-center text-gray-700">
                  <td class="text-start ps-6">
                    安全公司
                  </td>
                  <td>
                    NCC Group
                  </td>
                </tr>
                <tr class="text-center text-gray-700">
                  <td class="text-start ps-6">
                    白帽
                  </td>
                  <td>
                    Sam Curry
                  </td>
                </tr>
                <tr class="text-center text-gray-700">
                  <td class="text-start ps-6">
                    安全公司
                  </td>
                  <td>
                    Sky-Go Team
                  </td>
                </tr>
                <tr class="text-center text-gray-700">
                  <td class="text-start ps-6">
                    安全公司
                  </td>
                  <td>
                    Starvlab
                  </td>
                </tr>
              </tbody>
              <!--end::Table body-->
            </table>
            <!--end::Table-->
          </div>
          <!--end::Table container-->
        </div>
        <!--end::Table-->

        <!--begin::Title-->
        <h2 class="fw-bold text-dark mb-8">勒索组织</h2>
        <!--end::Title-->
        <!--begin::Table-->
        <div class="mb-14">
          <!--begin::Table container-->
          <div class="table-responsive">
            <!--begin::Table-->
            <table class="table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4">
              <!--begin::Table head-->
              <thead>
                <tr class="fw-bold fs-6 text-gray-700 text-center border-0 bg-light">
                  <th class="min-w-100px rounded-start text-start ps-6">机构名称</th>
                  <th class="min-w-100px">洋葱头版本</th>
                </tr>
              </thead>
              <!--end::Table head-->
              <!--begin::Table body-->
              <tbody class="border-bottom border-dashed fw-bold">
                <tr class="text-center text-gray-700">
                  <td class="text-start ps-6">
                    Arvin Club
                  </td>
                  <td>
                    V3
                  </td>
                </tr>
                <tr class="text-center text-gray-700">
                  <td class="text-start ps-6">
                    Babuk
                  </td>
                  <td>
                    V3
                  </td>
                </tr>
                <tr class="text-center text-gray-700">
                  <td class="text-start ps-6">
                    Black Basta
                  </td>
                  <td>
                    V3
                  </td>
                </tr>
                <tr class="text-center text-gray-700">
                  <td class="text-start ps-6">
                    AlphaVM/BlackCat
                  </td>
                  <td>
                    V3
                  </td>
                </tr>
                <tr class="text-center text-gray-700">
                  <td class="text-start ps-6">
                    BlackByte
                  </td>
                  <td>
                    V3
                  </td>
                </tr>
                <tr class="text-center text-gray-700">
                  <td class="text-start ps-6">
                    B14ckt0r
                  </td>
                  <td>
                    V3
                  </td>
                </tr>
                <tr class="text-center text-gray-700">
                  <td class="text-start ps-6">
                    CL0P
                  </td>
                  <td>
                    V3
                  </td>
                </tr>
                <tr class="text-center text-gray-700">
                  <td class="text-start ps-6">
                    CONTI
                  </td>
                  <td>
                    V3
                  </td>
                </tr>
                <tr class="text-center text-gray-700">
                  <td class="text-start ps-6">
                    CRYP70N1C0D3
                  </td>
                  <td>
                    V3
                  </td>
                </tr>
                <tr class="text-center text-gray-700">
                  <td class="text-start ps-6">
                    Cuba
                  </td>
                  <td>
                    V3
                  </td>
                </tr>
                <tr class="text-center text-gray-700">
                  <td class="text-start ps-6">
                    Everest
                  </td>
                  <td>
                    V3
                  </td>
                </tr>
                <tr class="text-center text-gray-700">
                  <td class="text-start ps-6">
                    Grief
                  </td>
                  <td>
                    V3
                  </td>
                </tr>
                <tr class="text-center text-gray-700">
                  <td class="text-start ps-6">
                    Hive
                  </td>
                  <td>
                    V3
                  </td>
                </tr>



                <tr class="text-center text-gray-700">
                  <td class="text-start ps-6">
                    Holy Ghost
                  </td>
                  <td>
                    V3
                  </td>
                </tr>
                <tr class="text-center text-gray-700">
                  <td class="text-start ps-6">
                    Karakurt
                  </td>
                  <td>
                    V3
                  </td>
                </tr>
                <tr class="text-center text-gray-700">
                  <td class="text-start ps-6">
                    KelvinSecurity
                  </td>
                  <td>
                  </td>
                </tr>
                <tr class="text-center text-gray-700">
                  <td class="text-start ps-6">
                    LockBit 2.0
                  </td>
                  <td>
                    V3
                  </td>
                </tr>
                <tr class="text-center text-gray-700">
                  <td class="text-start ps-6">
                    LockData Auction
                  </td>
                  <td>
                    V3
                  </td>
                </tr>
                <tr class="text-center text-gray-700">
                  <td class="text-start ps-6">
                    Lorenz
                  </td>
                  <td>
                    V3
                  </td>
                </tr>
                <tr class="text-center text-gray-700">
                  <td class="text-start ps-6">
                    LV BLOG
                  </td>
                  <td>
                    V3
                  </td>
                </tr>
                <tr class="text-center text-gray-700">
                  <td class="text-start ps-6">
                    Medusa
                  </td>
                  <td>
                    V3
                  </td>
                </tr>
                <tr class="text-center text-gray-700">
                  <td class="text-start ps-6">
                    Midas
                  </td>
                  <td>
                    V3
                  </td>
                </tr>
                <tr class="text-center text-gray-700">
                  <td class="text-start ps-6">
                    Moses Staff
                  </td>
                  <td>
                    |
                  </td>
                </tr>
                <tr class="text-center text-gray-700">
                  <td class="text-start ps-6">
                    Pandora
                  </td>
                  <td>
                    V3
                  </td>
                </tr>
                <tr class="text-center text-gray-700">
                  <td class="text-start ps-6">
                    Pay2Key
                  </td>
                  <td>
                    V3
                  </td>
                </tr>
                <tr class="text-center text-gray-700">
                  <td class="text-start ps-6">
                    Quantum
                  </td>
                  <td>
                    V3
                  </td>
                </tr>



                <tr class="text-center text-gray-700">
                  <td class="text-start ps-6">
                    Ragnar_Locker
                  </td>
                  <td>
                    V3
                  </td>
                </tr>
                <tr class="text-center text-gray-700">
                  <td class="text-start ps-6">
                    RAMP
                  </td>
                  <td>
                    V3
                  </td>
                </tr>
                <tr class="text-center text-gray-700">
                  <td class="text-start ps-6">
                    Ransom Carrel
                  </td>
                  <td>
                    V3
                  </td>
                </tr>
                <tr class="text-center text-gray-700">
                  <td class="text-start ps-6">
                    Ransom House
                  </td>
                  <td>
                    V3
                  </td>
                </tr>
                <tr class="text-center text-gray-700">
                  <td class="text-start ps-6">
                    RansomEXX
                  </td>
                  <td>
                    V3
                  </td>
                </tr>
                <tr class="text-center text-gray-700">
                  <td class="text-start ps-6">
                    REvil
                  </td>
                  <td>
                    V3
                  </td>
                </tr>
                <tr class="text-center text-gray-700">
                  <td class="text-start ps-6">
                    Snatch
                  </td>
                  <td>
                    V3
                  </td>
                </tr>
                <tr class="text-center text-gray-700">
                  <td class="text-start ps-6">
                    Stormous
                  </td>
                  <td>
                    V3
                  </td>
                </tr>
              </tbody>
              <!--end::Table body-->
            </table>
            <!--end::Table-->
          </div>
          <!--end::Table container-->
        </div>
        <!--end::Table-->

        <!--begin::Title-->
        <h2 class="fw-bold text-dark mb-8">车端与云端检测对比</h2>
        <!--end::Title-->
        <!--begin::Table-->
        <div class="mb-14">
          <!--begin::Table container-->
          <div class="table-responsive">
            <!--begin::Table-->
            <table class="table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4">
              <!--begin::Table head-->
              <thead>
                <tr class="fw-bold fs-6 text-gray-700 text-center border-0 bg-light">
                  <th class="min-w-100px rounded-start text-start ps-6">特性</th>
                  <th class="min-w-150px">车端安全检测</th>
                  <th class="min-w-150px">云端安全检测</th>
                </tr>
              </thead>
              <!--end::Table head-->
              <!--begin::Table body-->
              <tbody class="border-bottom border-dashed">
                <tr class="text-center text-gray-700">
                  <td class="text-start ps-6">
                    <div class="fw-semibold">数据量级</div>
                  </td>
                  <td class="text-start">
                    单车数据，其特点是安全响应及时。需要在每个车上安装，安装维护成本高，功能升级困难，无法检测多车安全威胁
                  </td>
                  <td class="text-start">
                    直接访问多车数据。应用集中部署，功能升级方便
                  </td>
                </tr>
                <tr class="text-center text-gray-700">
                  <td class="text-start ps-6">
                    <div class="fw-semibold">数据来源</div>
                  </td>
                  <td class="text-start">
                    单车数据，无法针对多来源数据进行检测。海外合规里面要求的“新型威胁感知和多种缓解措施”，比如：2022年底出现的新型攻击技术是黑客通从云端来控制汽车的威胁就无法检测
                  </td>
                  <td class="text-start">
                    包含车、云、手机应用多种类型数据。用户一个操作可以在车、云和手机应用多端生成日志，可以按照时间序分析事件链可以发现威胁风险
                  </td>
                </tr>
                <tr class="text-center text-gray-700">
                  <td class="text-start ps-6">
                    <div class="fw-semibold">兼容性</div>
                  </td>
                  <td class="text-start">
                    由于在车端安装，应用程序兼容不同版本的客户端。类似于手机应用需要兼容不同版本安卓系统的问题
                  </td>
                  <td class="text-start">
                    云端集中安装，不存在兼容性
                  </td>
                </tr>
                <tr class="text-center text-gray-700">
                  <td class="text-start ps-6">
                    <div class="fw-semibold">扩展性</div>
                  </td>
                  <td class="text-start">
                    检测能力有变化时每个车端都要升级
                  </td>
                  <td class="text-start">
                    适合多品牌、多车型，可以覆盖所有接入车辆。检测器能力不断迭代扩展
                  </td>
                </tr>
                <tr class="text-center text-gray-700">
                  <td class="text-start ps-6">
                    <div class="fw-semibold">AI能力</div>
                  </td>
                  <td class="text-start">
                    车端只有本车数据，形成了数据孤岛，无法做多辆车的关联分析，更加没法做大数据分析，AI依赖的多车数据训练(比如说：同车型数据训练)也无法完成
                  </td>
                  <td class="text-start">
                    云端有海量车的数据，可以对于多车建模，比如同车型建模，进而实现AI能力
                  </td>
                </tr>
                <tr class="text-center text-gray-700">
                  <td class="text-start ps-6">
                    <div class="fw-semibold">关联分析能力</div>
                  </td>
                  <td class="text-start">
                    单车无法关联其他车
                  </td>
                  <td class="text-start">
                    可以实现根据某车型或地域的多辆车做检测，如果多辆车在某个时间范围内满足了检测条件的话可以发现多资产的异常，可以扩展检测很多场景。举个例子，多辆车的IDPS在某个时间段分别在某个充电桩上发现有异常高的电流，由于车之间的数据是独立的，A车和B车是没有任何关系的，我们无法分析是车还是充电桩的故障。但是云端因为包含多辆车的数据，如果一定时间范围内多辆车在那个充电桩上都有高电流问题，我们可以判断充电桩出问题的可能性更大
                  </td>
                </tr>
                <tr class="text-center text-gray-700">
                  <td class="text-start ps-6">
                    <div class="fw-semibold">算力</div>
                  </td>
                  <td class="text-start">
                    单车算力依赖于车端ECU，硬件限制了整个软件检测能力，算力低决定了无法实现复杂检测
                  </td>
                  <td class="text-start">
                    云端算力无限扩展，容易实现复杂检测逻辑
                  </td>
                </tr>
              </tbody>
              <!--end::Table body-->
            </table>
            <!--end::Table-->
          </div>
          <!--end::Table container-->
        </div>
        <!--end::Table-->

        <!--end::Body-->
      </div>
      <!--end::Content main-->


    </div>
    <!--end::Body-->
  </div>
  <!--end::manual card-->
  <!--begin::FAQ card-->
  <div class="card">
    <!--begin::Body-->
    <div class="card-body p-10 p-lg-15">
      <!--begin::Classic content-->
      <div class="mb-13">
        <!--begin::Intro-->
        <div class="mb-15">
          <!--begin::Title-->
          <h4 class="fs-2x w-bolder mb-6">常见问题</h4>
          <!--end::Title-->
          <!--begin::Text-->
          <p class="fw-semibold fs-4 text-gray-600 mb-2">First, a disclaimer – the entire process of writing a blog post often takes more than a couple of hours, even if you can type eighty words as per minute and your writing skills are sharp.</p>
          <!--end::Text-->
        </div>
        <!--end::Intro-->
        <!--begin::Row-->
        <div class="row mb-12">
          <!--begin::Col-->
          <div class="col-md-6 pe-md-10 mb-10 mb-md-0">
            <!--begin::Title-->
            <h2 class="text-gray-700 fw-bold mb-4">技术架构</h2>
            <!--end::Title-->
            <!--begin::Accordion-->
            <!--begin::Section-->
            <div class="m-0">
              <!--begin::Heading-->
              <div class="d-flex align-items-center collapsible py-3 toggle mb-0" data-bs-toggle="collapse" data-bs-target="#kt_job_4_1">
                <!--begin::Icon-->
                <div class="btn btn-sm btn-icon mw-20px btn-active-color-primary me-5">
                  <i class="ki-duotone ki-minus-square toggle-on text-primary fs-1">
                    <span class="path1"></span>
                    <span class="path2"></span>
                  </i>
                  <i class="ki-duotone ki-plus-square toggle-off fs-1">
                    <span class="path1"></span>
                    <span class="path2"></span>
                    <span class="path3"></span>
                  </i>
                </div>
                <!--end::Icon-->
                <!--begin::Title-->
                <h4 class="text-gray-700 fw-bold cursor-pointer mb-0">为什么选择Flink作为大数据实时处理引擎?</h4>
                <!--end::Title-->
              </div>
              <!--end::Heading-->
              <!--begin::Body-->
              <div id="kt_job_4_1" class="collapse show fs-6 ms-1">
                <!--begin::Text-->
                <div class="mb-4 text-gray-600 fw-semibold fs-6 ps-10">实时计算框架，如：Hadoop MapReduce、Spark Streaming和Storm在大数据领域扮演了重要角色。但这些框架由于无法满足实时计算需求，导致延迟、流控、容错等问题。同时这些框架没有统一的计算模型，无法实现跨平台统一计算。Flink是Apache基金会开发的一款开源分布式流处理框架，其具有强大的实时计算能力、高性能及低延迟，能够轻松应对海量数据，且提供丰富的API支持跨平台部署。Flink提供了高级API，支持实时计算、批量处理、流处理，且可扩展性好。另外木卫四也使用了Flink作为大数据实时处理引擎。</div>
                <!--end::Text-->
              </div>
              <!--end::Content-->
              <!--begin::Separator-->
              <div class="separator separator-dashed"></div>
              <!--end::Separator-->
            </div>
            <!--end::Section-->
            <!--begin::Section-->
            <div class="m-0">
              <!--begin::Heading-->
              <div class="d-flex align-items-center collapsible py-3 toggle collapsed mb-0" data-bs-toggle="collapse" data-bs-target="#kt_job_4_2">
                <!--begin::Icon-->
                <div class="btn btn-sm btn-icon mw-20px btn-active-color-primary me-5">
                  <i class="ki-duotone ki-minus-square toggle-on text-primary fs-1">
                    <span class="path1"></span>
                    <span class="path2"></span>
                  </i>
                  <i class="ki-duotone ki-plus-square toggle-off fs-1">
                    <span class="path1"></span>
                    <span class="path2"></span>
                    <span class="path3"></span>
                  </i>
                </div>
                <!--end::Icon-->
                <!--begin::Title-->
                <h4 class="text-gray-700 fw-bold cursor-pointer mb-0">离线数据分析 v.s 实时数据分析</h4>
                <!--end::Title-->
              </div>
              <!--end::Heading-->
              <!--begin::Body-->
              <div id="kt_job_4_2" class="collapse fs-6 ms-1">
                <!--begin::Text-->
                <div class="mb-4 text-gray-600 fw-semibold fs-6 ps-10">离线数据分析一般是根据固定的周期，比如：每天统计一次，每周统计一次等类似于定时任务执行的场景，一般大家称为“批处理” 。实时数据分析一般基于数据事件，数据产生了就立即处理，数据在源源不断的产生，计算也在不停地运行，就像是一直流动的水流一样经过层层的管道计算处理，一般大家称为“流处理”。流处理的数据实时性是非常好的，数据所见即所得，不过实时的数据分析与计算对资源消耗比较大，如果后续数据发生了改变前期无法计算数据的最终状态。</div>
                <!--end::Text-->
              </div>
              <!--end::Content-->
              <!--begin::Separator-->
              <div class="separator separator-dashed"></div>
              <!--end::Separator-->
            </div>
            <!--end::Section-->
            <!--begin::Section-->
            <div class="m-0">
              <!--begin::Heading-->
              <div class="d-flex align-items-center collapsible py-3 toggle collapsed mb-0" data-bs-toggle="collapse" data-bs-target="#kt_job_4_3">
                <!--begin::Icon-->
                <div class="btn btn-sm btn-icon mw-20px btn-active-color-primary me-5">
                  <i class="ki-duotone ki-minus-square toggle-on text-primary fs-1">
                    <span class="path1"></span>
                    <span class="path2"></span>
                  </i>
                  <i class="ki-duotone ki-plus-square toggle-off fs-1">
                    <span class="path1"></span>
                    <span class="path2"></span>
                    <span class="path3"></span>
                  </i>
                </div>
                <!--end::Icon-->
                <!--begin::Title-->
                <h4 class="text-gray-700 fw-bold cursor-pointer mb-0">What do I need to do to start selling?</h4>
                <!--end::Title-->
              </div>
              <!--end::Heading-->
              <!--begin::Body-->
              <div id="kt_job_4_3" class="collapse fs-6 ms-1">
                <!--begin::Text-->
                <div class="mb-4 text-gray-600 fw-semibold fs-6 ps-10">First, a disclaimer – the entire process of writing a blog post often takes more than a couple of hours, even if you can type eighty words as per minute and your writing skills are sharp.</div>
                <!--end::Text-->
              </div>
              <!--end::Content-->
              <!--begin::Separator-->
              <div class="separator separator-dashed"></div>
              <!--end::Separator-->
            </div>
            <!--end::Section-->
            <!--begin::Section-->
            <div class="m-0">
              <!--begin::Heading-->
              <div class="d-flex align-items-center collapsible py-3 toggle collapsed mb-0" data-bs-toggle="collapse" data-bs-target="#kt_job_4_4">
                <!--begin::Icon-->
                <div class="btn btn-sm btn-icon mw-20px btn-active-color-primary me-5">
                  <i class="ki-duotone ki-minus-square toggle-on text-primary fs-1">
                    <span class="path1"></span>
                    <span class="path2"></span>
                  </i>
                  <i class="ki-duotone ki-plus-square toggle-off fs-1">
                    <span class="path1"></span>
                    <span class="path2"></span>
                    <span class="path3"></span>
                  </i>
                </div>
                <!--end::Icon-->
                <!--begin::Title-->
                <h4 class="text-gray-700 fw-bold cursor-pointer mb-0">How much does Extended license cost?</h4>
                <!--end::Title-->
              </div>
              <!--end::Heading-->
              <!--begin::Body-->
              <div id="kt_job_4_4" class="collapse fs-6 ms-1">
                <!--begin::Text-->
                <div class="mb-4 text-gray-600 fw-semibold fs-6 ps-10">First, a disclaimer – the entire process of writing a blog post often takes more than a couple of hours, even if you can type eighty words as per minute and your writing skills are sharp.</div>
                <!--end::Text-->
              </div>
              <!--end::Content-->
            </div>
            <!--end::Section-->
            <!--end::Accordion-->
          </div>
          <!--end::Col-->
          <!--begin::Col-->
          <div class="col-md-6 ps-md-10">
            <!--begin::Title-->
            <h2 class="text-gray-700 fw-bold mb-4">Installation</h2>
            <!--end::Title-->
            <!--begin::Accordion-->
            <!--begin::Section-->
            <div class="m-0">
              <!--begin::Heading-->
              <div class="d-flex align-items-center collapsible py-3 toggle mb-0" data-bs-toggle="collapse" data-bs-target="#kt_job_5_1">
                <!--begin::Icon-->
                <div class="btn btn-sm btn-icon mw-20px btn-active-color-primary me-5">
                  <i class="ki-duotone ki-minus-square toggle-on text-primary fs-1">
                    <span class="path1"></span>
                    <span class="path2"></span>
                  </i>
                  <i class="ki-duotone ki-plus-square toggle-off fs-1">
                    <span class="path1"></span>
                    <span class="path2"></span>
                    <span class="path3"></span>
                  </i>
                </div>
                <!--end::Icon-->
                <!--begin::Title-->
                <h4 class="text-gray-700 fw-bold cursor-pointer mb-0">What platforms are compatible?</h4>
                <!--end::Title-->
              </div>
              <!--end::Heading-->
              <!--begin::Body-->
              <div id="kt_job_5_1" class="collapse show fs-6 ms-1">
                <!--begin::Text-->
                <div class="mb-4 text-gray-600 fw-semibold fs-6 ps-10">First, a disclaimer – the entire process of writing a blog post often takes more than a couple of hours, even if you can type eighty words as per minute and your writing skills are sharp.</div>
                <!--end::Text-->
              </div>
              <!--end::Content-->
              <!--begin::Separator-->
              <div class="separator separator-dashed"></div>
              <!--end::Separator-->
            </div>
            <!--end::Section-->
            <!--begin::Section-->
            <div class="m-0">
              <!--begin::Heading-->
              <div class="d-flex align-items-center collapsible py-3 toggle collapsed mb-0" data-bs-toggle="collapse" data-bs-target="#kt_job_5_2">
                <!--begin::Icon-->
                <div class="btn btn-sm btn-icon mw-20px btn-active-color-primary me-5">
                  <i class="ki-duotone ki-minus-square toggle-on text-primary fs-1">
                    <span class="path1"></span>
                    <span class="path2"></span>
                  </i>
                  <i class="ki-duotone ki-plus-square toggle-off fs-1">
                    <span class="path1"></span>
                    <span class="path2"></span>
                    <span class="path3"></span>
                  </i>
                </div>
                <!--end::Icon-->
                <!--begin::Title-->
                <h4 class="text-gray-700 fw-bold cursor-pointer mb-0">How many people can it support?</h4>
                <!--end::Title-->
              </div>
              <!--end::Heading-->
              <!--begin::Body-->
              <div id="kt_job_5_2" class="collapse fs-6 ms-1">
                <!--begin::Text-->
                <div class="mb-4 text-gray-600 fw-semibold fs-6 ps-10">First, a disclaimer – the entire process of writing a blog post often takes more than a couple of hours, even if you can type eighty words as per minute and your writing skills are sharp.</div>
                <!--end::Text-->
              </div>
              <!--end::Content-->
              <!--begin::Separator-->
              <div class="separator separator-dashed"></div>
              <!--end::Separator-->
            </div>
            <!--end::Section-->
            <!--begin::Section-->
            <div class="m-0">
              <!--begin::Heading-->
              <div class="d-flex align-items-center collapsible py-3 toggle collapsed mb-0" data-bs-toggle="collapse" data-bs-target="#kt_job_5_3">
                <!--begin::Icon-->
                <div class="btn btn-sm btn-icon mw-20px btn-active-color-primary me-5">
                  <i class="ki-duotone ki-minus-square toggle-on text-primary fs-1">
                    <span class="path1"></span>
                    <span class="path2"></span>
                  </i>
                  <i class="ki-duotone ki-plus-square toggle-off fs-1">
                    <span class="path1"></span>
                    <span class="path2"></span>
                    <span class="path3"></span>
                  </i>
                </div>
                <!--end::Icon-->
                <!--begin::Title-->
                <h4 class="text-gray-700 fw-bold cursor-pointer mb-0">How long is the warrianty?</h4>
                <!--end::Title-->
              </div>
              <!--end::Heading-->
              <!--begin::Body-->
              <div id="kt_job_5_3" class="collapse fs-6 ms-1">
                <!--begin::Text-->
                <div class="mb-4 text-gray-600 fw-semibold fs-6 ps-10">First, a disclaimer – the entire process of writing a blog post often takes more than a couple of hours, even if you can type eighty words as per minute and your writing skills are sharp.</div>
                <!--end::Text-->
              </div>
              <!--end::Content-->
              <!--begin::Separator-->
              <div class="separator separator-dashed"></div>
              <!--end::Separator-->
            </div>
            <!--end::Section-->
            <!--begin::Section-->
            <div class="m-0">
              <!--begin::Heading-->
              <div class="d-flex align-items-center collapsible py-3 toggle collapsed mb-0" data-bs-toggle="collapse" data-bs-target="#kt_job_5_4">
                <!--begin::Icon-->
                <div class="btn btn-sm btn-icon mw-20px btn-active-color-primary me-5">
                  <i class="ki-duotone ki-minus-square toggle-on text-primary fs-1">
                    <span class="path1"></span>
                    <span class="path2"></span>
                  </i>
                  <i class="ki-duotone ki-plus-square toggle-off fs-1">
                    <span class="path1"></span>
                    <span class="path2"></span>
                    <span class="path3"></span>
                  </i>
                </div>
                <!--end::Icon-->
                <!--begin::Title-->
                <h4 class="text-gray-700 fw-bold cursor-pointer mb-0">How fast is the installation?</h4>
                <!--end::Title-->
              </div>
              <!--end::Heading-->
              <!--begin::Body-->
              <div id="kt_job_5_4" class="collapse fs-6 ms-1">
                <!--begin::Text-->
                <div class="mb-4 text-gray-600 fw-semibold fs-6 ps-10">First, a disclaimer – the entire process of writing a blog post often takes more than a couple of hours, even if you can type eighty words as per minute and your writing skills are sharp.</div>
                <!--end::Text-->
              </div>
              <!--end::Content-->
            </div>
            <!--end::Section-->
            <!--end::Accordion-->
          </div>
          <!--end::Col-->
        </div>
        <!--end::Row-->
        <!--begin::Row-->
        <div class="row">
          <!--begin::Col-->
          <div class="col-md-6 pe-md-10 mb-10 mb-md-0">
            <!--begin::Title-->
            <h2 class="text-gray-700 w-bolder mb-4">User Roles</h2>
            <!--end::Title-->
            <!--begin::Accordion-->
            <!--begin::Section-->
            <div class="m-0">
              <!--begin::Heading-->
              <div class="d-flex align-items-center collapsible py-3 toggle mb-0" data-bs-toggle="collapse" data-bs-target="#kt_job_6_1">
                <!--begin::Icon-->
                <div class="btn btn-sm btn-icon mw-20px btn-active-color-primary me-5">
                  <i class="ki-duotone ki-minus-square toggle-on text-primary fs-1">
                    <span class="path1"></span>
                    <span class="path2"></span>
                  </i>
                  <i class="ki-duotone ki-plus-square toggle-off fs-1">
                    <span class="path1"></span>
                    <span class="path2"></span>
                    <span class="path3"></span>
                  </i>
                </div>
                <!--end::Icon-->
                <!--begin::Title-->
                <h4 class="text-gray-700 fw-bold cursor-pointer mb-0">How does it work?</h4>
                <!--end::Title-->
              </div>
              <!--end::Heading-->
              <!--begin::Body-->
              <div id="kt_job_6_1" class="collapse show fs-6 ms-1">
                <!--begin::Text-->
                <div class="mb-4 text-gray-600 fw-semibold fs-6 ps-10">First, a disclaimer – the entire process of writing a blog post often takes more than a couple of hours, even if you can type eighty words as per minute and your writing skills are sharp.</div>
                <!--end::Text-->
              </div>
              <!--end::Content-->
              <!--begin::Separator-->
              <div class="separator separator-dashed"></div>
              <!--end::Separator-->
            </div>
            <!--end::Section-->
            <!--begin::Section-->
            <div class="m-0">
              <!--begin::Heading-->
              <div class="d-flex align-items-center collapsible py-3 toggle collapsed mb-0" data-bs-toggle="collapse" data-bs-target="#kt_job_6_2">
                <!--begin::Icon-->
                <div class="btn btn-sm btn-icon mw-20px btn-active-color-primary me-5">
                  <i class="ki-duotone ki-minus-square toggle-on text-primary fs-1">
                    <span class="path1"></span>
                    <span class="path2"></span>
                  </i>
                  <i class="ki-duotone ki-plus-square toggle-off fs-1">
                    <span class="path1"></span>
                    <span class="path2"></span>
                    <span class="path3"></span>
                  </i>
                </div>
                <!--end::Icon-->
                <!--begin::Title-->
                <h4 class="text-gray-700 fw-bold cursor-pointer mb-0">Do I need a designer to use this Admin Theme?</h4>
                <!--end::Title-->
              </div>
              <!--end::Heading-->
              <!--begin::Body-->
              <div id="kt_job_6_2" class="collapse fs-6 ms-1">
                <!--begin::Text-->
                <div class="mb-4 text-gray-600 fw-semibold fs-6 ps-10">First, a disclaimer – the entire process of writing a blog post often takes more than a couple of hours, even if you can type eighty words as per minute and your writing skills are sharp.</div>
                <!--end::Text-->
              </div>
              <!--end::Content-->
              <!--begin::Separator-->
              <div class="separator separator-dashed"></div>
              <!--end::Separator-->
            </div>
            <!--end::Section-->
            <!--begin::Section-->
            <div class="m-0">
              <!--begin::Heading-->
              <div class="d-flex align-items-center collapsible py-3 toggle collapsed mb-0" data-bs-toggle="collapse" data-bs-target="#kt_job_6_3">
                <!--begin::Icon-->
                <div class="btn btn-sm btn-icon mw-20px btn-active-color-primary me-5">
                  <i class="ki-duotone ki-minus-square toggle-on text-primary fs-1">
                    <span class="path1"></span>
                    <span class="path2"></span>
                  </i>
                  <i class="ki-duotone ki-plus-square toggle-off fs-1">
                    <span class="path1"></span>
                    <span class="path2"></span>
                    <span class="path3"></span>
                  </i>
                </div>
                <!--end::Icon-->
                <!--begin::Title-->
                <h4 class="text-gray-700 fw-bold cursor-pointer mb-0">What do I need to do to start selling?</h4>
                <!--end::Title-->
              </div>
              <!--end::Heading-->
              <!--begin::Body-->
              <div id="kt_job_6_3" class="collapse fs-6 ms-1">
                <!--begin::Text-->
                <div class="mb-4 text-gray-600 fw-semibold fs-6 ps-10">First, a disclaimer – the entire process of writing a blog post often takes more than a couple of hours, even if you can type eighty words as per minute and your writing skills are sharp.</div>
                <!--end::Text-->
              </div>
              <!--end::Content-->
              <!--begin::Separator-->
              <div class="separator separator-dashed"></div>
              <!--end::Separator-->
            </div>
            <!--end::Section-->
            <!--begin::Section-->
            <div class="m-0">
              <!--begin::Heading-->
              <div class="d-flex align-items-center collapsible py-3 toggle collapsed mb-0" data-bs-toggle="collapse" data-bs-target="#kt_job_6_4">
                <!--begin::Icon-->
                <div class="btn btn-sm btn-icon mw-20px btn-active-color-primary me-5">
                  <i class="ki-duotone ki-minus-square toggle-on text-primary fs-1">
                    <span class="path1"></span>
                    <span class="path2"></span>
                  </i>
                  <i class="ki-duotone ki-plus-square toggle-off fs-1">
                    <span class="path1"></span>
                    <span class="path2"></span>
                    <span class="path3"></span>
                  </i>
                </div>
                <!--end::Icon-->
                <!--begin::Title-->
                <h4 class="text-gray-700 fw-bold cursor-pointer mb-0">How much does Extended license cost?</h4>
                <!--end::Title-->
              </div>
              <!--end::Heading-->
              <!--begin::Body-->
              <div id="kt_job_6_4" class="collapse fs-6 ms-1">
                <!--begin::Text-->
                <div class="mb-4 text-gray-600 fw-semibold fs-6 ps-10">First, a disclaimer – the entire process of writing a blog post often takes more than a couple of hours, even if you can type eighty words as per minute and your writing skills are sharp.</div>
                <!--end::Text-->
              </div>
              <!--end::Content-->
            </div>
            <!--end::Section-->
            <!--end::Accordion-->
          </div>
          <!--end::Col-->
          <!--begin::Col-->
          <div class="col-md-6 ps-md-10">
            <!--begin::Title-->
            <h2 class="text-gray-700 fw-bold mb-4">Reports Generation</h2>
            <!--end::Title-->
            <!--begin::Accordion-->
            <!--begin::Section-->
            <div class="m-0">
              <!--begin::Heading-->
              <div class="d-flex align-items-center collapsible py-3 toggle mb-0" data-bs-toggle="collapse" data-bs-target="#kt_job_7_1">
                <!--begin::Icon-->
                <div class="btn btn-sm btn-icon mw-20px btn-active-color-primary me-5">
                  <i class="ki-duotone ki-minus-square toggle-on text-primary fs-1">
                    <span class="path1"></span>
                    <span class="path2"></span>
                  </i>
                  <i class="ki-duotone ki-plus-square toggle-off fs-1">
                    <span class="path1"></span>
                    <span class="path2"></span>
                    <span class="path3"></span>
                  </i>
                </div>
                <!--end::Icon-->
                <!--begin::Title-->
                <h4 class="text-gray-700 fw-bold cursor-pointer mb-0">What platforms are compatible?</h4>
                <!--end::Title-->
              </div>
              <!--end::Heading-->
              <!--begin::Body-->
              <div id="kt_job_7_1" class="collapse show fs-6 ms-1">
                <!--begin::Text-->
                <div class="mb-4 text-gray-600 fw-semibold fs-6 ps-10">First, a disclaimer – the entire process of writing a blog post often takes more than a couple of hours, even if you can type eighty words as per minute and your writing skills are sharp.</div>
                <!--end::Text-->
              </div>
              <!--end::Content-->
              <!--begin::Separator-->
              <div class="separator separator-dashed"></div>
              <!--end::Separator-->
            </div>
            <!--end::Section-->
            <!--begin::Section-->
            <div class="m-0">
              <!--begin::Heading-->
              <div class="d-flex align-items-center collapsible py-3 toggle collapsed mb-0" data-bs-toggle="collapse" data-bs-target="#kt_job_7_2">
                <!--begin::Icon-->
                <div class="btn btn-sm btn-icon mw-20px btn-active-color-primary me-5">
                  <i class="ki-duotone ki-minus-square toggle-on text-primary fs-1">
                    <span class="path1"></span>
                    <span class="path2"></span>
                  </i>
                  <i class="ki-duotone ki-plus-square toggle-off fs-1">
                    <span class="path1"></span>
                    <span class="path2"></span>
                    <span class="path3"></span>
                  </i>
                </div>
                <!--end::Icon-->
                <!--begin::Title-->
                <h4 class="text-gray-700 fw-bold cursor-pointer mb-0">How many people can it support?</h4>
                <!--end::Title-->
              </div>
              <!--end::Heading-->
              <!--begin::Body-->
              <div id="kt_job_7_2" class="collapse fs-6 ms-1">
                <!--begin::Text-->
                <div class="mb-4 text-gray-600 fw-semibold fs-6 ps-10">First, a disclaimer – the entire process of writing a blog post often takes more than a couple of hours, even if you can type eighty words as per minute and your writing skills are sharp.</div>
                <!--end::Text-->
              </div>
              <!--end::Content-->
              <!--begin::Separator-->
              <div class="separator separator-dashed"></div>
              <!--end::Separator-->
            </div>
            <!--end::Section-->
            <!--begin::Section-->
            <div class="m-0">
              <!--begin::Heading-->
              <div class="d-flex align-items-center collapsible py-3 toggle collapsed mb-0" data-bs-toggle="collapse" data-bs-target="#kt_job_7_3">
                <!--begin::Icon-->
                <div class="btn btn-sm btn-icon mw-20px btn-active-color-primary me-5">
                  <i class="ki-duotone ki-minus-square toggle-on text-primary fs-1">
                    <span class="path1"></span>
                    <span class="path2"></span>
                  </i>
                  <i class="ki-duotone ki-plus-square toggle-off fs-1">
                    <span class="path1"></span>
                    <span class="path2"></span>
                    <span class="path3"></span>
                  </i>
                </div>
                <!--end::Icon-->
                <!--begin::Title-->
                <h4 class="text-gray-700 fw-bold cursor-pointer mb-0">How long is the warrianty?</h4>
                <!--end::Title-->
              </div>
              <!--end::Heading-->
              <!--begin::Body-->
              <div id="kt_job_7_3" class="collapse fs-6 ms-1">
                <!--begin::Text-->
                <div class="mb-4 text-gray-600 fw-semibold fs-6 ps-10">First, a disclaimer – the entire process of writing a blog post often takes more than a couple of hours, even if you can type eighty words as per minute and your writing skills are sharp.</div>
                <!--end::Text-->
              </div>
              <!--end::Content-->
              <!--begin::Separator-->
              <div class="separator separator-dashed"></div>
              <!--end::Separator-->
            </div>
            <!--end::Section-->
            <!--begin::Section-->
            <div class="m-0">
              <!--begin::Heading-->
              <div class="d-flex align-items-center collapsible py-3 toggle collapsed mb-0" data-bs-toggle="collapse" data-bs-target="#kt_job_7_4">
                <!--begin::Icon-->
                <div class="btn btn-sm btn-icon mw-20px btn-active-color-primary me-5">
                  <i class="ki-duotone ki-minus-square toggle-on text-primary fs-1">
                    <span class="path1"></span>
                    <span class="path2"></span>
                  </i>
                  <i class="ki-duotone ki-plus-square toggle-off fs-1">
                    <span class="path1"></span>
                    <span class="path2"></span>
                    <span class="path3"></span>
                  </i>
                </div>
                <!--end::Icon-->
                <!--begin::Title-->
                <h4 class="text-gray-700 fw-bold cursor-pointer mb-0">How fast is the installation?</h4>
                <!--end::Title-->
              </div>
              <!--end::Heading-->
              <!--begin::Body-->
              <div id="kt_job_7_4" class="collapse fs-6 ms-1">
                <!--begin::Text-->
                <div class="mb-4 text-gray-600 fw-semibold fs-6 ps-10">First, a disclaimer – the entire process of writing a blog post often takes more than a couple of hours, even if you can type eighty words as per minute and your writing skills are sharp.</div>
                <!--end::Text-->
              </div>
              <!--end::Content-->
            </div>
            <!--end::Section-->
            <!--end::Accordion-->
          </div>
          <!--end::Col-->
        </div>
        <!--end::Row-->
      </div>
      <!--end::Classic content-->
      <!--begin::Section-->
      <div class="mb-17">
        <!--begin::Content-->
        <div class="d-flex flex-stack mb-5">
          <!--begin::Title-->
          <h3 class="text-dark">Video Tutorials</h3>
          <!--end::Title-->
          <!--begin::Link-->
          <a href="#" class="fs-6 fw-semibold link-primary">View All Videos</a>
          <!--end::Link-->
        </div>
        <!--end::Content-->
        <!--begin::Separator-->
        <div class="separator separator-dashed mb-9"></div>
        <!--end::Separator-->
        <!--begin::Row-->
        <div class="row g-10">
          <!--begin::Col-->
          <div class="col-md-4">
            <!--begin::Feature post-->
            <div class="card-xl-stretch me-md-6">
              <!--begin::Image-->
              <a class="d-block bgi-no-repeat bgi-size-cover bgi-position-center card-rounded position-relative min-h-175px mb-5" style="background-image:url('assets/media/stock/600x400/img-73.jpg')" data-fslightbox="lightbox-video-tutorials" href="https://www.youtube.com/embed/btornGtLwIo">
                <img src="assets/media/svg/misc/video-play.svg" class="position-absolute top-50 start-50 translate-middle" alt="" />
              </a>
              <!--end::Image-->
              <!--begin::Body-->
              <div class="m-0">
                <!--begin::Title-->
                <a href="../../demo1/dist/pages/user-profile/overview.html" class="fs-4 text-dark fw-bold text-hover-primary text-dark lh-base">Admin Panel - How To Started the Dashboard Tutorial</a>
                <!--end::Title-->
                <!--begin::Text-->
                <div class="fw-semibold fs-5 text-gray-600 text-dark my-4">We’ve been focused on making a the from also not been afraid to and step away been focused create eye</div>
                <!--end::Text-->
                <!--begin::Content-->
                <div class="fs-6 fw-bold">
                  <!--begin::Author-->
                  <a href="../../demo1/dist/pages/user-profile/overview.html" class="text-gray-700 text-hover-primary">Jane Miller</a>
                  <!--end::Author-->
                  <!--begin::Date-->
                  <span class="text-muted">on Mar 21 2021</span>
                  <!--end::Date-->
                </div>
                <!--end::Content-->
              </div>
              <!--end::Body-->
            </div>
            <!--end::Feature post-->
          </div>
          <!--end::Col-->
          <!--begin::Col-->
          <div class="col-md-4">
            <!--begin::Feature post-->
            <div class="card-xl-stretch mx-md-3">
              <!--begin::Image-->
              <a class="d-block bgi-no-repeat bgi-size-cover bgi-position-center card-rounded position-relative min-h-175px mb-5" style="background-image:url('assets/media/stock/600x400/img-74.jpg')" data-fslightbox="lightbox-video-tutorials" href="https://www.youtube.com/embed/btornGtLwIo">
                <img src="assets/media/svg/misc/video-play.svg" class="position-absolute top-50 start-50 translate-middle" alt="" />
              </a>
              <!--end::Image-->
              <!--begin::Body-->
              <div class="m-0">
                <!--begin::Title-->
                <a href="../../demo1/dist/pages/user-profile/overview.html" class="fs-4 text-dark fw-bold text-hover-primary text-dark lh-base">Admin Panel - How To Started the Dashboard Tutorial</a>
                <!--end::Title-->
                <!--begin::Text-->
                <div class="fw-semibold fs-5 text-gray-600 text-dark my-4">We’ve been focused on making the from v4 to v5 but we have also not been afraid to step away been focused</div>
                <!--end::Text-->
                <!--begin::Content-->
                <div class="fs-6 fw-bold">
                  <!--begin::Author-->
                  <a href="../../demo1/dist/pages/user-profile/overview.html" class="text-gray-700 text-hover-primary">Cris Morgan</a>
                  <!--end::Author-->
                  <!--begin::Date-->
                  <span class="text-muted">on Apr 14 2021</span>
                  <!--end::Date-->
                </div>
                <!--end::Content-->
              </div>
              <!--end::Body-->
            </div>
            <!--end::Feature post-->
          </div>
          <!--end::Col-->
          <!--begin::Col-->
          <div class="col-md-4">
            <!--begin::Feature post-->
            <div class="card-xl-stretch ms-md-6">
              <!--begin::Image-->
              <a class="d-block bgi-no-repeat bgi-size-cover bgi-position-center card-rounded position-relative min-h-175px mb-5" style="background-image:url('assets/media/stock/600x400/img-47.jpg')" data-fslightbox="lightbox-video-tutorials" href="https://www.youtube.com/embed/TWdDZYNqlg4">
                <img src="assets/media/svg/misc/video-play.svg" class="position-absolute top-50 start-50 translate-middle" alt="" />
              </a>
              <!--end::Image-->
              <!--begin::Body-->
              <div class="m-0">
                <!--begin::Title-->
                <a href="../../demo1/dist/pages/user-profile/overview.html" class="fs-4 text-dark fw-bold text-hover-primary text-dark lh-base">Admin Panel - How To Started the Dashboard Tutorial</a>
                <!--end::Title-->
                <!--begin::Text-->
                <div class="fw-semibold fs-5 text-gray-600 text-dark my-4">We’ve been focused on making the from v4 to v5 but we’ve also not been afraid to step away been focused</div>
                <!--end::Text-->
                <!--begin::Content-->
                <div class="fs-6 fw-bold">
                  <!--begin::Author-->
                  <a href="../../demo1/dist/pages/user-profile/overview.html" class="text-gray-700 text-hover-primary">Carles Nilson</a>
                  <!--end::Author-->
                  <!--begin::Date-->
                  <span class="text-muted">on May 14 2021</span>
                  <!--end::Date-->
                </div>
                <!--end::Content-->
              </div>
              <!--end::Body-->
            </div>
            <!--end::Feature post-->
          </div>
          <!--end::Col-->
        </div>
        <!--end::Row-->
      </div>
      <!--end::Section-->
      <!--begin::Card-->
      <div class="card mb-4 bg-light text-center">
        <!--begin::Body-->
        <div class="card-body py-12">
          <!--begin::Icon-->
          <a href="#" class="mx-4">
            <img src="assets/media/svg/brand-logos/facebook-4.svg" class="h-30px my-2" alt="" />
          </a>
          <!--end::Icon-->
          <!--begin::Icon-->
          <a href="#" class="mx-4">
            <img src="assets/media/svg/brand-logos/instagram-2-1.svg" class="h-30px my-2" alt="" />
          </a>
          <!--end::Icon-->
          <!--begin::Icon-->
          <a href="#" class="mx-4">
            <img src="assets/media/svg/brand-logos/github.svg" class="h-30px my-2" alt="" />
          </a>
          <!--end::Icon-->
          <!--begin::Icon-->
          <a href="#" class="mx-4">
            <img src="assets/media/svg/brand-logos/behance.svg" class="h-30px my-2" alt="" />
          </a>
          <!--end::Icon-->
          <!--begin::Icon-->
          <a href="#" class="mx-4">
            <img src="assets/media/svg/brand-logos/pinterest-p.svg" class="h-30px my-2" alt="" />
          </a>
          <!--end::Icon-->
          <!--begin::Icon-->
          <a href="#" class="mx-4">
            <img src="assets/media/svg/brand-logos/twitter.svg" class="h-30px my-2" alt="" />
          </a>
          <!--end::Icon-->
          <!--begin::Icon-->
          <a href="#" class="mx-4">
            <img src="assets/media/svg/brand-logos/dribbble-icon-1.svg" class="h-30px my-2" alt="" />
          </a>
          <!--end::Icon-->
        </div>
        <!--end::Body-->
      </div>
      <!--end::Card-->
    </div>
    <!--end::Body-->
  </div>
  <!--end::FAQ card-->
</template>

<script lang="ts">
import { getAssetPath } from "@/helpers/assets";
import { defineComponent } from "vue";
import Notice from "@/components/notice/notice.vue";

export default defineComponent({
  name: "manual",
  components: {
  },
  setup() {
    return {
      getAssetPath
    };
  },
});
</script>
